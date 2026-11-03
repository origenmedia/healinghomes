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
legs=[
 ("flight/stop_village.jpg","Single continuous cinematic drone flight, no cuts. The camera glides forward over the misty lake toward the shore, then rises smoothly up the green hillside and arrives high above a small village of white homes with brick domes around a central garden."),
 ("flight/stop_lane.jpg","Single continuous cinematic camera move, no cuts. The camera descends smoothly from above the village down to eye level on a quiet gravel lane, gliding forward toward a tall rammed earth wall with a wooden door and an old oak tree."),
 ("flight/stop_tierra.jpg","Single continuous steadicam move, no cuts. The camera glides forward through the open wooden door in the earth wall and into the private garden, arriving on the stone path in front of the house with the brick dome, the stone spout and the lake view."),
 ("flight/stop_storm.jpg","Single continuous steadicam move, no cuts. The camera glides forward into the house and through to the inner courtyard as a summer storm breaks, rain pouring from the big stone spout into the long basin."),
 ("flight/stop_garden.jpg","Single continuous steadicam move, no cuts. The rain clears and the camera glides out of the courtyard into the vegetable garden in warm golden light, past the basket on the path, homes with solar roofs beyond."),
 ("flight/stop_table.jpg","Single continuous cinematic camera move, no cuts. Dusk falls as the camera glides forward from the garden toward the long table under brick vaults, candles and string lights glowing, neighbors at dinner, the fire circle burning."),
]
start=sys.argv[1] if len(sys.argv)>1 else f"{D}/still0.jpg"
first=int(sys.argv[2]) if len(sys.argv)>2 else 0
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
    out=f"{D}/leg{i}.mp4"; urllib.request.urlretrieve(url,out)
    last=f"{D}/leg{i}_last.png"
    subprocess.run(["ffmpeg","-y","-loglevel","error","-sseof","-0.1","-i",out,"-frames:v","1",last],check=True)
    print(f"leg {i} done {url}",flush=True); img=last
print("ALL DONE",flush=True)
