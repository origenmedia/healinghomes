# Make one anchored clip: start frame -> end frame, Kling 2.5 Turbo Pro, 5 s. Usage: leg3.py legs.json NAME
import urllib.error, json, base64, time, urllib.request, sys, io
from PIL import Image
H={"Authorization":"Key dummy","Content-Type":"application/json"}
MODEL="fal-ai/kling-video/v2.5-turbo/pro/image-to-video"
def req(url, data=None):
    for k in range(5):
        try:
            r=urllib.request.Request(url, data=json.dumps(data).encode() if data is not None else None, headers=H)
            return json.load(urllib.request.urlopen(r, timeout=120))
        except urllib.error.HTTPError as e:
            print("http",e.code,url[-60:],e.read()[:300],flush=True)
            if k==4: raise
            time.sleep(10)
def datauri(p):
    im=Image.open(p).convert("RGB"); im.thumbnail((1280,1280)); b=io.BytesIO(); im.save(b,"JPEG",quality=92)
    return "data:image/jpeg;base64,"+base64.b64encode(b.getvalue()).decode()
LOOK=" Kodak Portra 400 film look, fine grain, true to life color, real documentary cinematography, no CGI look."
TAIL=" Smooth, graceful, slow motion, subtle parallax. No text, no captions, no signs, no cuts."
legs=json.load(open(sys.argv[1])); L=legs[sys.argv[2]]
inp={"prompt":L["prompt"]+LOOK+TAIL,"image_url":datauri(L["start"]),"tail_image_url":datauri(L["end"]),"duration":"5",
     "negative_prompt":"blur, distort, low quality, cuts, text, watermark, cartoon, extra people, extra buildings, barn, shed, pool","cfg_scale":0.5}
sub=req(f"https://queue.fal.run/{MODEL}",inp); print("submitted",sub.get("request_id"),flush=True)
while True:
    s=req(sub["status_url"])
    if s["status"]=="COMPLETED": break
    time.sleep(8)
res=req(sub["response_url"]); url=res["video"]["url"]
out=f"v4/film/{sys.argv[2]}.mp4"; urllib.request.urlretrieve(url,out); print("done",out,url,flush=True)
