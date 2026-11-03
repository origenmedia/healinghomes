# Find the white phone screen in a frame and lay a UI image into it.
import sys, json, numpy as np
from PIL import Image, ImageFilter

def screen_mask(img):
    a=np.asarray(img.convert('RGB')).astype(np.int16)
    mx=a.max(2); mn=a.min(2)
    m=(mn>200)&((mx-mn)<40)
    mi=Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(5))
    m=np.asarray(mi)>127
    m=biggest_blob(m)
    ys,xs=np.nonzero(m); cy,cx=int(np.median(ys)),int(np.median(xs))
    return m,(cx,cy)

def biggest_blob(m):
    from collections import deque
    f=4; H,W=m.shape; s=m[::f,::f].copy(); h,w=s.shape
    lab=np.zeros((h,w),np.int32); best=(0,0); n=0
    for y0 in range(h):
        for x0 in np.nonzero(s[y0]&(lab[y0]==0))[0]:
            n+=1; q=deque([(y0,x0)]); lab[y0,x0]=n; c=0
            while q:
                y,x=q.popleft(); c+=1
                for yy,xx in ((y+1,x),(y-1,x),(y,x+1),(y,x-1)):
                    if 0<=yy<h and 0<=xx<w and s[yy,xx] and not lab[yy,xx]:
                        lab[yy,xx]=n; q.append((yy,xx))
            if c>best[0]: best=(c,n)
    keep=(lab==best[1])
    big=np.repeat(np.repeat(keep,f,0),f,1)[:H,:W]
    return m&big

def robust_line(pts, axis):
    # axis 0: y=f(x) ; axis 1: x=f(y)
    p=np.array(pts,float)
    u,v=(p[:,0],p[:,1]) if axis==0 else (p[:,1],p[:,0])
    keep=np.ones(len(u),bool)
    for _ in range(6):
        k,b=np.polyfit(u[keep],v[keep],1); r=np.abs(v-(k*u+b))
        thr=max(2.0,np.percentile(r[keep],60)*2); keep=r<thr
    return k,b

def quad(img):
    m,(cx,cy)=screen_mask(img); H,W=m.shape
    ys,xs=np.nonzero(m)
    x0,x1=np.percentile(xs,[2,98]); y0,y1=np.percentile(ys,[2,98])
    top=[];bot=[];lef=[];rig=[]
    for x in np.linspace(x0+(x1-x0)*.2,x1-(x1-x0)*.2,60).astype(int):
        col=np.nonzero(m[:,x])[0]
        if len(col): top.append((x,col.min())); bot.append((x,col.max()))
    for y in np.linspace(y0+(y1-y0)*.2,y1-(y1-y0)*.2,80).astype(int):
        row=np.nonzero(m[y,:])[0]
        if len(row): lef.append((row.min(),y)); rig.append((row.max(),y))
    T=robust_line(top,0);B=robust_line(bot,0);L=robust_line(lef,1);R=robust_line(rig,1)
    def inter(h,v):  # y=kh x+bh ; x=kv y+bv
        kh,bh=h;kv,bv=v; y=(kh*bv+bh)/(1-kh*kv); x=kv*y+bv; return (x,y)
    return [inter(T,L),inter(T,R),inter(B,R),inter(B,L)], m

def homography(src,dst):
    A=[]
    for (x,y),(u,v) in zip(src,dst):
        A+= [[x,y,1,0,0,0,-u*x,-u*y,-u],[0,0,0,x,y,1,-v*x,-v*y,-v]]
    _,_,Vt=np.linalg.svd(np.array(A,float)); return Vt[-1].reshape(3,3)

def composite(base, ui, q, m, radius_frac=0.06):
    W,H=base.size; uw,uh=ui.size
    Hm=homography(q,[(0,0),(uw,0),(uw,uh),(0,uh)])  # dst->ui
    yy,xx=np.mgrid[0:H,0:W]; P=np.stack([xx.ravel(),yy.ravel(),np.ones(W*H)])
    Q=Hm@P; u=(Q[0]/Q[2]).reshape(H,W); v=(Q[1]/Q[2]).reshape(H,W)
    inside=(u>=0)&(u<uw-1)&(v>=0)&(v<uh-1)
    # rounded corners
    r=radius_frac*uw
    cxd=np.minimum(u,uw-u); cyd=np.minimum(v,uh-v)
    corner=(cxd<r)&(cyd<r)&(((r-cxd)**2+(r-cyd)**2)>r*r)
    inside&=~corner
    uarr=np.asarray(ui.convert('RGB')).astype(np.float32)
    ui_=np.clip(u,0,uw-1).astype(int); vi_=np.clip(v,0,uh-1).astype(int)
    samp=uarr[vi_,ui_]
    # keep thumbs on top: only paint where the screen is white (m), softened
    mask=Image.fromarray(((inside&m)*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    a=(np.asarray(mask).astype(np.float32)/255)[...,None]
    b=np.asarray(base.convert('RGB')).astype(np.float32)
    # slight screen glow and warmth so it sits in the scene
    samp=samp*0.94+np.array([12,8,2])
    out=b*(1-a)+samp*a
    return Image.fromarray(np.clip(out,0,255).astype(np.uint8))

if __name__=='__main__':
    base=Image.open(sys.argv[1]).convert('RGB'); q,m=quad(base)
    print(json.dumps([(round(x,1),round(y,1)) for x,y in q]))
    if len(sys.argv)>3:
        composite(base,Image.open(sys.argv[2]),q,m).save(sys.argv[3])
