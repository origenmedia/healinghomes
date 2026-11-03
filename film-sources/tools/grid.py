# Grid of screenshots with labels.
import sys
from PIL import Image, ImageDraw
out, w, cols = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]); files = sys.argv[4:]
ims = []
for f in files:
    im = Image.open(f).convert('RGB'); h = round(im.height*w/im.width); im = im.resize((w, h))
    d = ImageDraw.Draw(im); lab = f.split('/')[-1].rsplit('.', 1)[0]; d.rectangle([0, 0, 7*len(lab)+6, 14], fill=(0, 0, 0)); d.text((3, 2), lab, fill=(255, 255, 0)); ims.append(im)
hmax = max(i.height for i in ims); rows = (len(ims)+cols-1)//cols
S = Image.new('RGB', (cols*w+(cols-1)*4, rows*hmax+(rows-1)*4), (255, 255, 255))
for i, im in enumerate(ims): S.paste(im, ((i % cols)*(w+4), (i//cols)*(hmax+4)))
S.save(out, quality=82)
