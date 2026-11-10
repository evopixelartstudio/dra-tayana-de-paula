"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export type TiltStackCard = {
  title: string
  /** Small line above the title, e.g. "7 days · Dolomites". */
  kicker?: string
  description: string
  image: string
  alt?: string
  /** Short chips under the copy. */
  tags?: string[]
  /** Big figure on the right, e.g. "€1,840". */
  price?: string
  priceNote?: string
  cta?: string
  href?: string
  /** Tint for the chip dots and the button. */
  accent?: string
}

export type TiltStackScrollProps = {
  cards: TiltStackCard[]
  eyebrow?: string
  heading?: string
  /** Height of the sticky stage; the section scrolls one stage per card. */
  height?: string
  /** Settle on the nearest card when scrolling stops. */
  snap?: boolean
  className?: string
}

// #region pose
export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export type Pose = { y: number; scale: number; rx: number; rz: number; shade: number; opacity: number }

/** Where card i sits when the scroll is at p (0 = first card, n-1 = last).
 *  A card slides up tilted and turned, lands flat, then tips back and shrinks
 *  as later cards land on it. y is a percentage of the card's own height. */
export function pose(p: number, i: number, reduced: boolean): Pose {
  const enter = i === 0 ? 1 : clamp(p - (i - 1), 0, 1)
  const depth = clamp(p - i, 0, 3)
  if (reduced)
    return { y: 0, scale: 1, rx: 0, rz: 0, shade: Math.min(depth, 1) * 0.5, opacity: enter >= 1 ? 1 : enter }
  const e = easeOut(enter)
  return {
    y: (1 - e) * 130 - depth * 3.2,
    scale: (1 - depth * 0.07) * (0.9 + 0.1 * e),
    rx: (1 - e) * 22 - depth * 9,
    rz: (1 - e) * (i % 2 ? 5 : -5) + 0,
    shade: Math.min(depth, 2) * 0.34,
    opacity: depth > 2.6 ? clamp((3 - depth) / 0.4, 0, 1) : 1,
  }
}

export const toTransform = (q: Pose) =>
  "translate3d(0," + q.y.toFixed(3) + "%,0) perspective(1400px) rotateX(" + q.rx.toFixed(3) + "deg) rotateZ(" + q.rz.toFixed(3) + "deg) scale(" + q.scale.toFixed(4) + ")"

export const pad2 = (n: number) => (n < 10 ? "0" : "") + n
// #endregion

const SERIF = '"Cormorant Garamond",Georgia,serif'
const MONO = '"Manrope",ui-monospace,"SF Mono",Menlo,monospace'

const CSS =
  ".tss-track{position:relative;width:100%}" +
  ".tss-stage{position:sticky;top:0;display:flex;flex-direction:column;overflow:hidden;background:var(--color-creme,#F7F4EF);color:var(--color-grafite,#302B2C);box-sizing:border-box;padding:clamp(20px,4vh,44px) 16px clamp(20px,4vh,40px)}" +
  ".tss-head{position:relative;z-index:5;width:100%;max-width:1080px;margin:0 auto 22px;display:flex;align-items:flex-end;justify-content:space-between;gap:20px}" +
  ".tss-eyebrow{font:600 11px/1 " + MONO + ";letter-spacing:.2em;text-transform:uppercase;color:var(--color-bordo,#772E40);margin:0 0 12px}" +
  ".tss-h{font:600 clamp(30px,5vw,52px)/1.08 " + SERIF + ";letter-spacing:-.015em;margin:0;max-width:20ch;color:var(--color-grafite,#302B2C)}" +
  ".tss-h span{display:inline-block}" +
  ".tss-count{flex:none;font:600 12px/1 " + MONO + ";letter-spacing:.12em;color:var(--color-grafite-muted,#82797A);display:flex;align-items:center;gap:12px}" +
  ".tss-count b{font-weight:700;color:var(--color-bordo,#772E40);font-size:24px;letter-spacing:0}" +
  ".tss-rail{width:100px;height:3px;border-radius:3px;background:var(--color-areia,#D9C9BD);overflow:hidden}" +
  ".tss-rail i{display:block;height:100%;width:100%;background:var(--color-bordo,#772E40);transform-origin:0 50%;transform:scaleX(0)}" +
  ".tss-deck{position:relative;flex:1;width:100%;max-width:1080px;margin:clamp(20px,4vh,40px) auto 0;min-height:0}" +
  ".tss-card{position:absolute;inset:0;border-radius:28px;overflow:hidden;transform-origin:50% 0;will-change:transform;backface-visibility:hidden;background:#1a1416;color:#fff;" +
  "box-shadow:0 1px 0 rgba(255,255,255,.18) inset,0 0 0 1px rgba(0,0,0,.1),0 40px 80px -30px rgba(48,43,44,.45),0 16px 36px -16px rgba(119,46,64,.35)}" +
  ".tss-card>img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;transform:scale(1.04)}" +
  ".tss-card::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(26,20,22,.88) 0%,rgba(26,20,22,.6) 42%,rgba(26,20,22,0) 75%),linear-gradient(0deg,rgba(26,20,22,.75),rgba(26,20,22,0) 45%)}" +
  ".tss-shade{position:absolute;inset:0;z-index:4;background:#120c0e;opacity:0;pointer-events:none}" +
  ".tss-body{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(24px,3.8vw,48px)}" +
  ".tss-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}" +
  ".tss-num{font:500 clamp(48px,8vw,96px)/.8 " + SERIF + ";letter-spacing:-.03em;color:rgba(247,244,239,.95)}" +
  ".tss-kick{font:600 11px/1 " + MONO + ";letter-spacing:.16em;text-transform:uppercase;padding:9px 14px;border-radius:999px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);white-space:nowrap;color:#fff}" +
  ".tss-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:28px}" +
  ".tss-copy{max-width:540px}" +
  ".tss-title{font:600 clamp(28px,4.2vw,50px)/1 " + SERIF + ";letter-spacing:-.015em;margin:0 0 14px;color:#fff}" +
  ".tss-desc{font:400 clamp(14px,1.2vw,16px)/1.6 'Manrope',sans-serif;color:rgba(247,244,239,.82);margin:0 0 20px}" +
  ".tss-tags{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}" +
  ".tss-tags li{display:flex;align-items:center;gap:7px;font:500 12px/1 'Manrope',sans-serif;padding:8px 13px;border-radius:999px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.18);color:#fff}" +
  ".tss-tags li::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--tss-accent)}" +
  ".tss-buy{flex:none;text-align:right}" +
  ".tss-price{font:600 clamp(24px,3vw,38px)/1 " + SERIF + ";letter-spacing:-.01em;color:#fff}" +
  ".tss-note{display:block;font:600 11px/1 " + MONO + ";letter-spacing:.12em;text-transform:uppercase;color:rgba(247,244,239,.7);margin:8px 0 16px}" +
  ".tss-cta{display:inline-flex;align-items:center;gap:10px;font:600 14px/1 'Manrope',sans-serif;color:#fff;background:var(--tss-accent);padding:14px 22px;border-radius:999px;text-decoration:none;border:0;cursor:pointer;" +
  "box-shadow:0 1px 0 rgba(255,255,255,.4) inset,0 10px 24px -8px var(--tss-accent);transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .3s}" +
  ".tss-cta:hover{transform:translateY(-2px) scale(1.03)}" +
  ".tss-cta:active{transform:scale(.97)}" +
  ".tss-cta:focus-visible{outline:2px solid #fff;outline-offset:3px}" +
  ".tss-cta svg{transition:transform .35s cubic-bezier(.34,1.56,.64,1)}" +
  ".tss-cta:hover svg{transform:translateX(3px)}" +
  "@media (max-width:640px){.tss-bottom{flex-direction:column;align-items:flex-start;gap:18px}.tss-buy{text-align:left;display:flex;align-items:center;gap:16px;width:100%;justify-content:space-between}.tss-note{margin:6px 0 0}" +
  ".tss-card::before{background:linear-gradient(0deg,rgba(26,20,22,.94) 0%,rgba(26,20,22,.65) 55%,rgba(26,20,22,.1) 100%)}.tss-desc{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.tss-head{flex-direction:column;align-items:flex-start;gap:14px}.tss-card{border-radius:22px}}" +
  "@media (prefers-reduced-motion:reduce){.tss-cta,.tss-cta svg{transition:none}}"

export default function TiltStackScroll({
  cards,
  eyebrow = "Áreas de Atuação",
  heading = "Cuidados especializados para suas mãos e punhos",
  height = "100svh",
  snap = true,
  className = "",
}: TiltStackScrollProps) {
  const track = useRef(null as HTMLDivElement | null)
  const els = useRef([] as (HTMLElement | null)[])
  const shades = useRef([] as (HTMLDivElement | null)[])
  const count = useRef(null as HTMLElement | null)
  const rail = useRef(null as HTMLElement | null)
  const headWords = useRef(null as HTMLHeadingElement | null)
  const n = cards.length

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reduced = mq.matches
    let last = -1
    let p = 0

    const paint = () => {
      for (let i = 0; i < n; i++) {
        const el = els.current[i]
        if (!el) continue
        const q = pose(p, i, reduced)
        el.style.transform = toTransform(q)
        el.style.opacity = String(q.opacity)
        const sh = shades.current[i]
        if (sh) sh.style.opacity = String(q.shade)
      }
      const idx = Math.round(p)
      if (idx !== last && count.current) {
        last = idx
        count.current.textContent = pad2(idx + 1)
      }
      if (rail.current) rail.current.style.transform = "scaleX(" + (n > 1 ? p / (n - 1) : 1).toFixed(4) + ")"
    }

    const trigger = ScrollTrigger.create({
      trigger: track.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        p = self.progress * Math.max(n - 1, 0)
        paint()
      },
      snap: snap && !reduced && n > 1 ? { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: "power2.inOut" } : undefined,
    })
    paint()

    // Entrance: the heading words rise, the first card lands from a tilt.
    const ctx = gsap.context(() => {
      if (reduced) return
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } })
      const words = headWords.current ? headWords.current.querySelectorAll(".tss-w") : []
      intro.from(words, { yPercent: 110, opacity: 0, rotate: 3, duration: 1.1, stagger: 0.06 }, 0.1)
      if (els.current[0]) intro.from(els.current[0], { yPercent: 18, rotateX: 18, scale: 0.92, opacity: 0, duration: 1.4, clearProps: "rotateX" }, 0.25)
      intro.eventCallback("onComplete", paint)
    })

    const on = () => {
      reduced = mq.matches
      paint()
    }
    mq.addEventListener("change", on)
    return () => {
      mq.removeEventListener("change", on)
      trigger.kill()
      ctx.revert()
      paint()
    }
  }, [n, snap])

  return (
    <div ref={track} className={"tss-track " + className} style={{ height: "calc(" + height + " * " + Math.max(n, 1) + ")" }}>
      <style>{CSS}</style>
      <section className="tss-stage" style={{ height }} aria-roledescription="carousel" aria-label={heading}>
        <header className="tss-head">
          <div>
            <p className="tss-eyebrow">{eyebrow}</p>
            <h2 className="tss-h" ref={headWords}>
              {heading.split(" ").map((w, i) => (
                <span key={i} style={{ overflow: "hidden", paddingBottom: 4 }}>
                  <span className="tss-w">{w}</span>
                  {"\u00A0"}
                </span>
              ))}
            </h2>
          </div>
          <div className="tss-count" aria-hidden="true">
            <b ref={count}>01</b> / {pad2(n)}
            <span className="tss-rail">
              <i ref={rail} />
            </span>
          </div>
        </header>
        <div className="tss-deck">
          {cards.map((c, i) => (
            <article
              key={c.title + i}
              className="tss-card"
              ref={(el) => {
                els.current[i] = el
              }}
              style={{ zIndex: i + 1, ["--tss-accent" as string]: c.accent ?? "#772E40" }}
              aria-roledescription="slide"
              aria-label={pad2(i + 1) + " de " + pad2(n) + ": " + c.title}
            >
              <img src={c.image} alt={c.alt ?? ""} draggable={false} loading={i < 2 ? "eager" : "lazy"} />
              <div className="tss-body">
                <div className="tss-top">
                  <span className="tss-num">{pad2(i + 1)}</span>
                  {c.kicker && <span className="tss-kick">{c.kicker}</span>}
                </div>
                <div className="tss-bottom">
                  <div className="tss-copy">
                    <h3 className="tss-title">{c.title}</h3>
                    <p className="tss-desc">{c.description}</p>
                    {c.tags && c.tags.length > 0 && (
                      <ul className="tss-tags">
                        {c.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {(c.price || c.cta) && (
                    <div className="tss-buy">
                      {c.price && (
                        <div>
                          <div className="tss-price">{c.price}</div>
                          {c.priceNote && <span className="tss-note">{c.priceNote}</span>}
                        </div>
                      )}
                      <a className="tss-cta" href={c.href ?? "#"} onClick={c.href ? undefined : (e) => e.preventDefault()}>
                        {c.cta ?? "Agendar avaliação"}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="tss-shade"
                ref={(el) => {
                  shades.current[i] = el
                }}
              />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
