import subprocess,sys
d,end,scale,crf,g,out=sys.argv[1:7]
L=['n0','n1','n2','n3','n4','n5','a0','hold','b0','leg2','leg3','g0','g1','m0','m1','e0','e1',end,'u1']
args=['ffmpeg','-y','-loglevel','error']
for l in L: args+=['-i',f'{d}/{l}.mp4']
fc=''.join(f'[{i}:v]scale={scale}:-2,fps=24,setsar=1,format=yuv420p[v{i}];' for i in range(len(L)))+''.join(f'[v{i}]' for i in range(len(L)))+f'concat=n={len(L)}:v=1:a=0[o]'
args+=['-filter_complex',fc,'-map','[o]','-an','-c:v','libx264','-crf',crf,'-g',g,'-bf','0','-movflags','+faststart',out]
subprocess.run(args,check=True)
