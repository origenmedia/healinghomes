import sys, numpy as np, subprocess, os
from PIL import Image
sys.path.insert(0,'tools'); import phonecomp as pc
d=sys.argv[1]; base=Image.open(f'{d}/a0_last.png').convert('RGB')
q,m=pc.quad(base); print(d,q,base.size)
st={k:pc.composite(base,Image.open(f'ui/{k}.png'),q,m) for k in ['idle','press','ok']}
out=f'{d}/hold'; os.makedirs(out,exist_ok=True)
W,H=base.size; cx=sum(p[0] for p in q)/4; cy=sum(p[1] for p in q)/4
N=72
for i in range(N):
    t=i/24
    if t<1.4: img=Image.blend(base,st['idle'],min(1,t/0.3))
    elif t<1.8: img=st['press']
    else: img=st['ok']
    z=1+0.03*i/(N-1); w,h=W/z,H/z
    x0=min(max(cx-w/2,0),W-w); y0=min(max(cy-h/2,0),H-h)
    img.crop((int(x0),int(y0),int(x0+w),int(y0+h))).resize((W,H),Image.LANCZOS).save(f'{out}/f{i:03d}.png')
Image.open(f'{out}/f{N-1:03d}.png').save(f'{d}/hold_last.png')
subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','24','-i',f'{out}/f%03d.png','-c:v','libx264','-crf','16','-pix_fmt','yuv420p',f'{d}/hold.mp4'],check=True)
