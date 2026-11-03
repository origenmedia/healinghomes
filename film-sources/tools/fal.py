import sys, json, base64, time, urllib.request, urllib.error, mimetypes, os
H={"Authorization":"Key dummy","Content-Type":"application/json"}
def req(url, data=None, method=None):
    r=urllib.request.Request(url, data=json.dumps(data).encode() if data is not None else None, headers=H, method=method)
    try:
        return json.load(urllib.request.urlopen(r, timeout=120))
    except urllib.error.HTTPError as e:
        print("HTTP", e.code, url, e.read()[:600].decode("utf8","replace"), file=sys.stderr); raise
def datauri(p):
    m=mimetypes.guess_type(p)[0] or "image/jpeg"
    return f"data:{m};base64,"+base64.b64encode(open(p,"rb").read()).decode()
def run(model, inp, out_prefix):
    sub=req(f"https://queue.fal.run/{model}", inp)
    st=sub["status_url"]; ru=sub["response_url"]
    while True:
        s=req(st)
        if s["status"]=="COMPLETED": break
        time.sleep(4)
    res=req(ru)
    outs=[]
    for i,img in enumerate(res.get("images",[])):
        u=img["url"]
        if u.startswith("data:"):
            b=base64.b64decode(u.split(",",1)[1]); ext="png" if "png" in u[:30] else "jpg"
            p=f"{out_prefix}{'' if i==0 else '_'+str(i)}.{ext}"; open(p,"wb").write(b); outs.append(p)
        else: outs.append(u)
    print(json.dumps({"out":outs,"desc":res.get("description","")[:200]}))
if __name__=="__main__":
    spec=json.load(open(sys.argv[1]))
    inp=spec["input"]; inp["sync_mode"]=True
    if spec.get("refs"): inp["image_urls"]=[datauri(p) for p in spec["refs"]]
    run(spec["model"], inp, spec["out"])
