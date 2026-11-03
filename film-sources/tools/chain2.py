import urllib.error, json, base64, time, urllib.request, subprocess, sys, io
from PIL import Image
H={"Authorization":"Key dummy","Content-Type":"application/json"}
MODEL="fal-ai/kling-video/v2.5-turbo/pro/image-to-video"
D="flight"
def req(url, data=None):
    for k in range(5):
        try:
            r=urllib.request.Request(url, data=json.dumps(data).encode() if data is not None else None, headers=H)
            return json.load(urllib.request.urlopen(r, timeout=120))
        except urllib.error.HTTPError as e:
            print("http",e.code,url[-60:],e.read()[:200],flush=True)
            if k==4: raise
            time.sleep(8)
def datauri(p):
    im=Image.open(p).convert("RGB"); im.thumbnail((1280,1280)); b=io.BytesIO(); im.save(b,"JPEG",quality=90)
    return "data:image/jpeg;base64,"+base64.b64encode(b.getvalue()).decode()
LOOK="Kodak Portra 400 film look, fine grain, true to life color, real documentary cinematography, no CGI look."
TAIL=" Smooth, graceful, slow motion, subtle parallax. No text, no captions, no cuts."
CFG=json.load(open(sys.argv[1]))
legs=CFG["legs"]; D=CFG["dir"]; PREFIX=CFG.get("prefix","leg")
start=CFG["start"]
first=CFG.get("first",0)
img=start
for i in range(first,len(legs)):
    for attempt in range(3):
        inp={"prompt":legs[i][1]+" "+LOOK+TAIL,"image_url":datauri(img),"tail_image_url":datauri(legs[i][0]),"duration":"5","negative_prompt":"blur, distort, low quality, cuts, text, watermark, cartoon","cfg_scale":0.5}
        sub=req(f"https://queue.fal.run/{MODEL}",inp)
        while True:
            s=req(sub["status_url"])
            if s["status"]=="COMPLETED": break
            time.sleep(6)
        try:
            res=req(sub["response_url"]); url=res["video"]["url"]; break
        except Exception as e:
            print(f"leg {i} attempt {attempt} failed: {e}",flush=True)
    else:
        print("giving up",flush=True); sys.exit(1)
    out=f"{D}/{PREFIX}{i}.mp4"; urllib.request.urlretrieve(url,out)
    last=f"{D}/{PREFIX}{i}_last.png"
    subprocess.run(["ffmpeg","-y","-loglevel","error","-sseof","-0.1","-i",out,"-frames:v","1",last],check=True)
    print(f"leg {i} done {url}",flush=True); img=last
print("ALL DONE",flush=True)
