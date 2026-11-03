# Paste the real dark panel array from roof #8 (close village shot) onto other roofs, in code.
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
SRC_IMG = 'v4/fix/v1_fixed.png'
OS = np.array([1427.5, 1656.0]); WS = np.array([35.5, 16.0]); ROW = np.array([-8.0, 11.0])
WS_WHITE_BOX = [(1396, 1652, 1408, 1662)]   # clean bare roof next to the source array

def med(a, boxes):
    px = np.concatenate([a[y0:y1, x0:x1].reshape(-1, 3) for (x0, y0, x1, y1) in boxes])
    return np.median(px, axis=0)

def paste(img, src, targets):
    A = np.asarray(img, dtype=np.float64).copy()
    S = np.asarray(src, dtype=np.float64)
    Ws = med(S, WS_WHITE_BOX)
    for t in targets:
        Ot, wt, ht = map(np.array, (t['O'], t['w'], t['h'])); rows = t['rows']; haze = t.get('haze', 0.05)
        hs = ROW * rows
        T = np.array([[wt[0], ht[0]], [wt[1], ht[1]]]); Sm = np.array([[WS[0], hs[0]], [WS[1], hs[1]]])
        M = Sm @ np.linalg.inv(T); b = OS - M @ Ot
        wimg = src.transform(img.size, Image.AFFINE, (M[0,0], M[0,1], b[0], M[1,0], M[1,1], b[1]), resample=Image.BICUBIC)
        if t.get('blur'): wimg = wimg.filter(ImageFilter.GaussianBlur(t['blur']))
        warped = np.asarray(wimg, dtype=np.float64)
        quad = [tuple(Ot), tuple(Ot + wt), tuple(Ot + wt + ht), tuple(Ot + ht)]
        k = 4; m = Image.new('L', (img.size[0] * k, img.size[1] * k), 0)
        ImageDraw.Draw(m).polygon([(x * k, y * k) for x, y in quad], fill=255)
        m = np.asarray(m.resize(img.size, Image.LANCZOS), dtype=np.float64)[..., None] / 255
        Wt = med(A, t['white']) if 'white' in t else None
        if Wt is None:
            xs = [p[0] for p in quad]; ys = [p[1] for p in quad]
            Wt = med(A, [(int(min(xs)) + 2, int(min(ys)) + 2, int(max(xs)) - 2, int(max(ys)) - 2)])
        out = warped * (Wt / Ws) * np.array(t.get('tint', (1.0, 1.0, 1.0)))
        out = out * (1 - haze) + Wt * haze
        A = A * (1 - m) + out * m
    return Image.fromarray(A.round().clip(0, 255).astype(np.uint8))
