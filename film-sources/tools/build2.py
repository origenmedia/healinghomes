# Build one film from legs. Each item is "name" or "name@speed" (speed > 1 plays faster).
import subprocess, sys, json
d, scale, crf, g, out = sys.argv[1:6]
L = sys.argv[6:]
args = ['ffmpeg', '-y', '-loglevel', 'error']
names, speeds = [], []
for item in L:
    n, s = (item.split('@') + ['1'])[:2]
    names.append(n); speeds.append(float(s))
    args += ['-i', f'{d}/{n}.mp4']
fc = ''
for i, s in enumerate(speeds):
    fc += f'[{i}:v]setpts=PTS/{s},scale={scale}:-2,fps=24,setsar=1,format=yuv420p[v{i}];'
fc += ''.join(f'[v{i}]' for i in range(len(L))) + f'concat=n={len(L)}:v=1:a=0[o]'
args += ['-filter_complex', fc, '-map', '[o]', '-an', '-c:v', 'libx264', '-crf', crf, '-g', g, '-bf', '0', '-movflags', '+faststart', out]
subprocess.run(args, check=True)
# Print each leg's start time in the finished film, for the captions.
t = 0.0; marks = []
for n, s in zip(names, speeds):
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{d}/{n}.mp4'], capture_output=True, text=True).stdout)
    marks.append((n, round(t, 3), round(dur / s, 3))); t += dur / s
print(json.dumps({'total': round(t, 3), 'legs': marks}))
