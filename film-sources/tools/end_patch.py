# Ending design: centered end card over the stars, a dark end section that
# continues the night, and a floating button that stays visible on any ground.
import re
TSX='/home/user/healinghomes/components/film/ScrollFilm.tsx'
CSS='/home/user/healinghomes/lib/site/css/scroll-film.css'
s=open(TSX).read()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:60],s.count(a)); s=s.replace(a,b)
rep("type Chapter = { at: [number, number]; title: string; sub?: string; still: string; concept?: boolean };",
    "type Chapter = { at: [number, number]; title: string; sub?: string; still: string; concept?: boolean; end?: boolean };")
rep("still: 'night' },","still: 'night', end: true },")
rep("title: 'Your new home, on your phone.'","title: 'The whole build, on your phone.'")
# ending + past classes
rep("      el.classList.toggle('ask', past || (p > 0.08 && idx < CHAPTERS.length - 1));",
    "      el.classList.toggle('ask', past || (p > 0.08 && idx < CHAPTERS.length - 1));\n      el.classList.toggle('ending', idx === CHAPTERS.length - 1);\n      el.classList.toggle('past', past);")
rep("""            <div key={c.title} data-cap className={`sf-cap${i === 0 ? ' on' : ''}`}>""",
    """            <div key={c.title} data-cap className={`sf-cap${c.end ? ' end' : ''}${i === 0 ? ' on' : ''}`}>
              {c.end && <span className="sf-eyebrow">Founding families</span>}""")
rep("""        <div className="sf-shade" aria-hidden="true" />""",
    """        <div className="sf-shade" aria-hidden="true" />
        <div className="sf-endshade" aria-hidden="true" />""")
open(TSX,'w').write(s)
c=open(CSS).read()
c+="""
/* The ending: the stars dim a little and the last screen becomes a centered
   card, so the call to action reads as its own page. */
.sf-endshade { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity 0.6s ease; background: radial-gradient(ellipse at 50% 55%, rgba(14, 17, 22, 0.35), rgba(14, 17, 22, 0.75) 70%), linear-gradient(to bottom, rgba(14, 17, 22, 0) 70%, #0E1116); }
.sf.ending .sf-endshade { opacity: 1; }
.sf-caps { top: 0; }
.sf-cap.end { align-self: center; justify-self: center; justify-items: center; text-align: center; max-width: 680px; padding-top: 40px; }
.sf-cap.end h2 { font-size: clamp(38px, 6vw, 76px); }
.sf-cap.end p { max-width: 34ch; }
.sf-eyebrow { font: 600 12px/1 var(--body); letter-spacing: 0.22em; text-transform: uppercase; color: var(--on-image-2); }
.sf-cap.end .sf-cta { justify-content: center; gap: 12px; margin-top: 14px; }
.sf-cap.end .sf-cta a { font-size: 16px; padding: 18px 26px; }
.sf .sf-cap.end .sf-cta .inv { padding-top: 10px; text-align: center; }
@media (max-width: 760px) {
  .sf-cap.end { padding-top: 0; }
  .sf-cap.end .sf-cta { flex-direction: column; align-items: stretch; width: min(100%, 340px); }
  .sf-cap.end .sf-cta a { text-align: center; }
}
/* After the film the floating button turns lake blue so it reads on dark and on paper. */
.sf.past .sf-ask { background: #3B6378; color: #FFFFFF; }
"""
# dark end section that continues the night
c=c.replace(".sf-after { background: var(--paper, #F5F2EB); color: #1A1F2A; padding-block: clamp(64px, 9vw, 120px); }",
            ".sf-after { background: #0E1116; color: #F5F2EB; padding-block: clamp(56px, 8vw, 110px) clamp(72px, 9vw, 120px); }")
c=c.replace(".sf-after .links a { display: grid; gap: 6px; padding: 20px 0; border-top: 1px solid #D8D3C5; color: #1A1F2A; text-decoration: none; }",
            ".sf-after .links a { display: grid; gap: 6px; padding: 20px 0; border-top: 1px solid rgba(245, 242, 235, 0.16); color: #F5F2EB; text-decoration: none; }\n.sf-after .links a:hover b, .sf-after .links a:focus-visible b { text-decoration: underline; text-underline-offset: 5px; }")
c=c.replace(".sf-after .links span { color: #565B62;",".sf-after .links span { color: #AEB3BA;")
c=c.replace(".sf-after .inv { color: #565B62;",".sf-after .inv { color: #AEB3BA;")
c=c.replace(".sf-after .inv a { color: #3B6378; font-weight: 600; }",".sf-after .inv a { color: #F5F2EB; font-weight: 600; text-underline-offset: 3px; }")
open(CSS,'w').write(c)
print("patched")
