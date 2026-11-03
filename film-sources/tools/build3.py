# Build the 9 home phone film: normalize pieces, apply the free code fixes, join with short dissolves.
import subprocess, json
FPS=24; W=720; H=1294
SEG='v4/film/seg/'
def run(args): subprocess.run(['ffmpeg','-v','error','-y']+args,check=True)
def nframes(p):
    out=subprocess.run(['ffprobe','-v','error','-count_frames','-select_streams','v:0','-show_entries','stream=nb_read_frames','-of','csv=p=0',p],capture_output=True,text=True).stdout.strip()
    return int(out)
NORM=f'scale={W}:{H}:flags=lanczos,fps={FPS},setsar=1,format=yuv420p'
ENC=['-c:v','libx264','-crf','14','-preset','medium','-pix_fmt','yuv420p','-an']
def norm(src,dst,trim=None,slow=None):
    vf=[]
    if trim: vf.append(f'trim=start_frame={trim[0]}:end_frame={trim[1]+1},setpts=PTS-STARTPTS')
    vf.append(NORM)
    if slow: vf.append(f'setpts={slow}*PTS,minterpolate=fps={FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1')
    run(['-i',src,'-vf',','.join(vf)]+ENC+[dst])
def xfade2(a,b,dst,frames):
    na=nframes(a); d=frames/FPS; off=(na-frames)/FPS
    run(['-i',a,'-i',b,'-filter_complex',f'[0:v][1:v]xfade=transition=fade:duration={d:.4f}:offset={off:.4f},format=yuv420p[o]','-map','[o]']+ENC+[dst])
def concat(srcs,dst):
    inputs=sum([['-i',s] for s in srcs],[])
    fc=''.join(f'[{i}:v]' for i in range(len(srcs)))+f'concat=n={len(srcs)}:v=1:a=0[o]'
    run(inputs+['-filter_complex',fc,'-map','[o]']+ENC+[dst])
F='v4/film/'; T='tall/'
# 1. simple pieces
for n in ['L01','L02','L10','L11','L13','L14','L16','L20','L21']: norm(F+n+'.mp4',SEG+n+'.mp4')
for n in ['n1','n2','n3','n4','n5','a0','hold2','g0s','u1']: norm(T+n+'.mp4',SEG+n+'.mp4')
# 2. L15: the son appears from nowhere in frames 25-71. Keep 0-24 and 72-121, dissolve across.
norm(F+'L15.mp4',SEG+'L15a.mp4',trim=(0,24)); norm(F+'L15.mp4',SEG+'L15b.mp4',trim=(72,121))
xfade2(SEG+'L15a.mp4',SEG+'L15b.mp4',SEG+'L15.mp4',12)
# 3. L17: normal until the table, then settle slowly (3x) so two captions have time.
norm(F+'L17.mp4',SEG+'L17a.mp4',trim=(0,86)); norm(F+'L17.mp4',SEG+'L17b.mp4',trim=(87,121),slow=3)
concat([SEG+'L17a.mp4',SEG+'L17b.mp4'],SEG+'L17.mp4')
# 4. L19: a second small dome and a paved road show in frames 22-95. Keep 0-21 (slowed) and 96-121, dissolve across.
norm(F+'L19.mp4',SEG+'L19a.mp4',trim=(0,21),slow=2.5); norm(F+'L19.mp4',SEG+'L19b.mp4',trim=(96,121))
xfade2(SEG+'L19a.mp4',SEG+'L19b.mp4',SEG+'L19.mp4',12)
# 5. the kept run, hard cuts as in the live film
concat([SEG+n+'.mp4' for n in ['n1','n2','n3','n4','n5','a0','hold2']],SEG+'K1.mp4')
order=['L01','L02','K1','L10','L11','g0s','L13','L14','L15','L16','L17','L19','L20','L21','u1']
fade={('L10','L11'):8,('L11','g0s'):8,('L14','L15'):8,('L20','L21'):8}
lens={n:nframes(SEG+n+'.mp4') for n in order}
inputs=sum([['-i',SEG+n+'.mp4'] for n in order],[])
fc=''; cur='[0:v]'; total=lens[order[0]]; starts={order[0]:0.0}
for i in range(1,len(order)):
    f=fade.get((order[i-1],order[i]),6); d=f/FPS; off=(total-f)/FPS
    starts[order[i]]=off
    fc+=f'{cur}[{i}:v]xfade=transition=fade:duration={d:.4f}:offset={off:.4f}[x{i}];'; cur=f'[x{i}]'; total+=lens[order[i]]-f
fc+=f'{cur}format=yuv420p[o]'
run(inputs+['-filter_complex',fc,'-map','[o]','-an','-c:v','libx264','-crf','30','-g','6','-bf','0','-preset','slow','-pix_fmt','yuv420p','-movflags','+faststart','v4/film/film-tall.mp4'])
print(json.dumps({'frames':total,'seconds':round(total/FPS,3),'starts':{k:round(v,3) for k,v in starts.items()},'lens':lens}))
