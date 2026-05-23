"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, ShoppingBag, User, Zap, Layers, Check, GraduationCap, MapPin, Users, MessageCircle, type LucideIcon } from "lucide-react";
import { useContentCtx } from "@/components/inline-editor/content-context";
import Editable from "@/components/inline-editor/Editable";
import EditableList from "@/components/inline-editor/EditableList";
import type { CtaItem, ServiceItem, ShowcaseItem, StatItem, LocalPoint, ProcessStep, SectionKey } from "@/lib/site-content";
import { SECTION_KEYS } from "@/lib/site-content";

/* ─── Preview Mockups - real photography + styled layouts ─── */

function MinimalPreview() {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-3 py-2 border-b border-black/10 flex-shrink-0">
        <span className="text-[5px] tracking-[0.2em] font-medium text-gray-800 uppercase">Mara Studio</span>
        <div className="flex gap-2">{["Work","About","Contact"].map(l=><span key={l} className="text-[4px] text-gray-400">{l}</span>)}</div>
      </div>
      <div className="flex-1 relative overflow-hidden min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/mara-hero-main/400/300" alt="" className="w-full h-full object-cover" style={{filter:"brightness(0.72)"}} />
        <div className="absolute bottom-0 left-0 p-3">
          <div className="text-[9px] font-light text-white leading-tight" style={{fontFamily:"Georgia,serif"}}>Light.<br/>Form.<br/>Feeling.</div>
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-px h-7">
        {["mara-coast","mara-port1","mara-road","mara-form"].map(s=>(
          <div key={s} className="flex-1 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://picsum.photos/seed/${s}/80/80`} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlayfulPreview() {
  return (
    <div className="w-full h-full bg-[#1a3a2a] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-3 py-2 flex-shrink-0">
        <span className="text-[6px] font-bold text-white tracking-wide" style={{fontFamily:"sans-serif"}}>ZEST CAFÉ</span>
        <div className="bg-[#f5e6c8] text-[#1a3a2a] text-[4px] font-bold px-2 py-0.5 rounded-full">Order →</div>
      </div>
      <div className="flex-1 relative overflow-hidden min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/zest-hero-main/400/300" alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 flex flex-col justify-end p-3">
          <div className="text-[11px] font-bold text-[#f5e6c8] leading-tight" style={{fontFamily:"Georgia,serif"}}>Good coffee.<br/>Good life.</div>
          <div className="text-[4px] text-white/50 mt-1">Nanaimo, BC · Open daily</div>
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-1 p-1.5 bg-[#0f2419]">
        {[["Espresso","$4"],["Matcha","$5"],["Latte","$5"]].map(([n,p])=>(
          <div key={n} className="flex-1 bg-[#1a3a2a] rounded px-1.5 py-1">
            <div className="text-[4.5px] font-bold text-[#f5e6c8]">{n}</div>
            <div className="text-[4px] text-white/40">{p}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfessionalPreview() {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-600 rounded-sm"/>
          <span className="text-[5px] font-bold text-gray-900">Harbour Advisory</span>
        </div>
        <div className="bg-gray-900 text-white text-[4px] px-2 py-0.5 font-semibold rounded">Book a Call</div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 p-3 flex flex-col justify-center">
          <div className="text-[4px] text-blue-600 font-semibold uppercase tracking-wide mb-1">CFP · CFA Accredited</div>
          <div className="text-[8px] font-bold text-gray-900 leading-tight">Your financial<br/>future, secured.</div>
          <div className="mt-2 flex gap-1 items-center">
            <div className="flex -space-x-0.5">{[0,1,2].map(i=><div key={i} className="w-3 h-3 rounded-full bg-gray-300 border border-white"/>)}</div>
            <span className="text-[3.5px] text-gray-400">1,800+ clients</span>
          </div>
        </div>
        <div className="w-16 relative flex-shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/seed/harbour-hero-p/150/200" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/50"/>
        </div>
      </div>
      <div className="flex-shrink-0 flex bg-gray-50 border-t border-gray-100">
        {[["$2.4B","AUM"],["25yr","Exp"],["1.8k","Clients"]].map(([v,l])=>(
          <div key={l} className="flex-1 text-center py-1.5">
            <div className="text-[6px] font-bold text-gray-900">{v}</div>
            <div className="text-[3.5px] text-gray-400">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoldPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] overflow-hidden flex flex-col relative">
      <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent z-10"/>
      <div className="flex justify-between items-center px-3 py-2 border-b border-white/[0.06] flex-shrink-0 relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[#d4af37]" style={{clipPath:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"}}/>
          <span className="text-[5px] text-white tracking-[0.12em] uppercase font-light">Onyx Events</span>
        </div>
        <span className="text-[4px] border border-[#d4af37] text-[#d4af37] px-1.5 py-0.5 tracking-wider">Enquire</span>
      </div>
      <div className="flex-1 relative overflow-hidden min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/onyx-hero-main/400/300" alt="" className="w-full h-full object-cover" style={{filter:"brightness(0.4)"}} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-10">
          <div className="text-[5px] tracking-[0.25em] text-[#d4af37] uppercase mb-1.5 font-light">Luxury Events</div>
          <div className="text-[10px] font-light text-white leading-tight" style={{fontFamily:"Georgia,serif"}}>
            Where moments<br/><span className="italic text-[#d4af37]">become legend.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradesPreview() {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="bg-[#f97316] text-white text-[4px] text-center py-0.5 flex-shrink-0 font-bold tracking-wider uppercase">
        24/7 Emergency Service
      </div>
      <div className="flex justify-between items-center px-3 py-1.5 bg-[#1e3a5f] flex-shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#f97316] rounded flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[5px] font-bold">⚙</span>
          </div>
          <span className="text-[5px] font-bold text-white">Peak Home Services</span>
        </div>
        <div className="bg-[#f97316] text-white text-[4px] font-bold px-1.5 py-0.5 rounded">Get a Quote</div>
      </div>
      <div className="flex-1 relative overflow-hidden min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/trades-hero-main/400/300" alt="" className="w-full h-full object-cover" style={{filter:"brightness(0.38)"}} />
        <div className="absolute inset-0 flex flex-col justify-center p-3">
          <div className="text-[8px] font-bold text-white leading-tight">Fast, Reliable<br/>Home Services</div>
          <div className="text-[3.5px] text-white/60 mt-1">Nanaimo, BC · Licensed & Insured</div>
          <div className="mt-2 flex gap-1">
            <div className="bg-[#f97316] text-white text-[3.5px] font-bold px-2 py-0.5 rounded">Free Quote</div>
            <div className="border border-white/60 text-white text-[3.5px] px-2 py-0.5 rounded">Call Now</div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-100 bg-white">
        {[["🔧","Plumbing"],["❄️","HVAC"],["⚡","Electric"],["🚰","Drains"]].map(([icon,label])=>(
          <div key={label} className="flex-1 text-center py-1.5 border-r border-gray-100 last:border-0">
            <div className="text-[7px]">{icon}</div>
            <div className="text-[3px] text-gray-500 font-medium">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EcommercePreview() {
  return (
    <div className="w-full h-full bg-[#faf7f2] overflow-hidden flex flex-col">
      <div className="bg-[#3d2c1e] text-white text-[4px] text-center py-1 flex-shrink-0">Free shipping over $75 · Handmade in BC</div>
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-[#e8ddd0] flex-shrink-0">
        <span className="text-[6px] font-semibold text-[#3d2c1e]" style={{fontFamily:"Georgia,serif"}}>Cedar & Co.</span>
        <div className="flex items-center gap-1.5">
          {["Shop","Story"].map(l=><span key={l} className="text-[4px] text-[#8a7060]">{l}</span>)}
          <div className="w-4 h-4 bg-[#3d2c1e] rounded-full flex items-center justify-center">
            <span className="text-white text-[4px]">2</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 p-3 flex flex-col justify-center">
          <div className="text-[5px] tracking-widest text-[#8a7060] uppercase mb-1">Handmade · BC</div>
          <div className="text-[8px] font-semibold text-[#3d2c1e] leading-tight" style={{fontFamily:"Georgia,serif"}}>Crafted<br/>with care.</div>
          <div className="mt-2 bg-[#3d2c1e] text-white text-[4px] px-2 py-0.5 rounded inline-block w-fit">Shop Now</div>
        </div>
        <div className="w-20 relative overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/seed/cedar-hero-main/150/200" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-1 p-1.5 border-t border-[#e8ddd0]">
        {[["cedar-p1","$89"],["cedar-p2","$34"],["cedar-p3","$56"]].map(([s,p])=>(
          <div key={s} className="flex-1 relative overflow-hidden rounded" style={{height:"22px"}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://picsum.photos/seed/${s}/60/60`} alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 bg-[#faf7f2]/90 text-[#3d2c1e] text-[3.5px] px-1 font-semibold">{p}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Icon + Preview lookups ───────────────────────────── */

const previewMap: Record<string, React.ComponentType> = {
  minimal: MinimalPreview,
  playful: PlayfulPreview,
  professional: ProfessionalPreview,
  bold: BoldPreview,
  ecommerce: EcommercePreview,
  trades: TradesPreview,
};

const serviceIconMap: Record<ServiceItem["iconKey"], LucideIcon> = {
  globe: Globe,
  user: User,
  "shopping-bag": ShoppingBag,
  zap: Zap,
  layers: Layers,
};

const localIconMap: Record<LocalPoint["iconKey"], LucideIcon> = {
  "map-pin": MapPin,
  users: Users,
  "message-circle": MessageCircle,
};

/* ─── Animation variants ───────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

/* ─── Editable list templates (used by EditableList "+ add below") ─── */
const serviceTemplate: ServiceItem = { iconKey: "globe", label: "New service", desc: "Describe it here." };
const localPointTemplate: LocalPoint = { iconKey: "map-pin", label: "New point", sub: "Subtitle" };
const statTemplate: StatItem = { value: "0", label: "New stat" };
const processStepTemplate: ProcessStep = { step: "04", title: "New step", desc: "Describe it." };
const ctaTemplate: CtaItem = { label: "New button", href: "/contact", primary: false };

/* ─── Section renderers ────────────────────────────────── */

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const { content } = useContentCtx();
  const showcaseItems = content.home.showcase.items;
  const ctas = content.home.hero.ctas;

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#ece7de]">
      <div className="absolute inset-0 opacity-[0.018]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "120px",
      }}/>

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 items-center">

          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[11px] font-medium px-3 py-1.5 rounded-full mb-7">
              <GraduationCap size={12}/>
              <Editable path="home.hero.badge" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-[clamp(3rem,7vw,6.5rem)] font-semibold text-[#1a1a1a] leading-[1.02] tracking-[-0.03em]">
              <Editable path="home.hero.titlePart1" /><br />
              <Editable path="home.hero.titlePart2" className="text-[#999]" />
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 text-lg text-[#666] max-w-lg leading-relaxed">
              <Editable path="home.hero.subtitle" />
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
              <EditableList<CtaItem>
                path="home.hero.ctas"
                template={ctaTemplate}
                itemClassName="inline-flex"
                minItems={1}
              >
                {(cta, i) => (
                  <Link
                    href={cta.href}
                    className={
                      cta.primary
                        ? "inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-sm font-medium px-6 py-3.5 rounded-full hover:bg-black transition-all hover:gap-3"
                        : "inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] px-6 py-3.5 rounded-full border border-black/15 hover:bg-white transition-colors"
                    }
                  >
                    <Editable path={`home.hero.ctas[${i}].label`} />
                    {cta.primary && <ArrowRight size={14} />}
                  </Link>
                )}
              </EditableList>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 flex items-center gap-8">
              <EditableList<StatItem>
                path="home.hero.stats"
                template={statTemplate}
                itemClassName="min-w-0"
                minItems={1}
              >
                {(_item, i) => (
                  <>
                    <Editable path={`home.hero.stats[${i}].value`} as="div" className="text-lg font-semibold text-[#1a1a1a]" />
                    <Editable path={`home.hero.stats[${i}].label`} as="div" className="text-xs text-[#999] mt-0.5" />
                  </>
                )}
              </EditableList>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:grid grid-cols-3 gap-2.5"
            style={{ gridTemplateRows: "138px 138px" }}
          >
            {showcaseItems.map((s) => {
              const Preview = previewMap[s.key];
              return (
                <Link key={s.key} href={s.href}
                  className="group rounded-xl overflow-hidden border border-black/[0.08] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-full h-full relative">
                    {Preview ? <Preview /> : null}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <span className="text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-2 py-1 rounded-full">
                        {s.label} →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

function MarqueeSection() {
  const { content } = useContentCtx();
  const items = content.home.marquee;
  return (
    <div className="relative z-10 bg-[#f5f2ec] -mt-3 rounded-t-[2rem] overflow-hidden border-b border-black/[0.07] shadow-[0_-12px_40px_rgba(0,0,0,0.10)]">
      <div className="py-4 overflow-hidden">
        <div className="animate-marquee">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 text-[11px] font-medium tracking-[0.18em] uppercase text-[#aaa] mx-5">
              {item}<span className="w-1 h-1 rounded-full bg-black/20 inline-block"/>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShowcaseSection() {
  const { content } = useContentCtx();
  const showcaseItems = content.home.showcase.items;
  return (
    <section id="showcase" className="bg-white py-24 px-6 border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3"><Editable path="home.showcase.eyebrow" /></motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight"><Editable path="home.showcase.title" /></motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-base text-[#888] max-w-lg"><Editable path="home.showcase.subtitle" /></motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcaseItems.map((s: ShowcaseItem, i) => {
            const Preview = previewMap[s.key];
            return (
              <motion.div key={s.key} variants={fadeUp}>
                <Link href={s.href} className="group block">
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
                    className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-sm hover:shadow-xl transition-shadow duration-400">
                    <div className="h-52 relative overflow-hidden">
                      {Preview ? <Preview /> : null}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                        <span className="bg-white text-[#1a1a1a] text-xs font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                          {content.home.showcase.viewLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 bg-white">
                      <div className="flex items-start justify-between">
                        <div>
                          <Editable as="div" path={`home.showcase.items[${i}].tag`} className="text-[10px] uppercase tracking-widest text-[#999] font-medium" />
                          <Editable as="h3" path={`home.showcase.items[${i}].label`} className="mt-0.5 text-lg font-semibold text-[#1a1a1a]" />
                        </div>
                        <div className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-colors">
                          <ArrowRight size={12} className="text-[#999] group-hover:text-white transition-colors"/>
                        </div>
                      </div>
                      <Editable as="p" path={`home.showcase.items[${i}].description`} className="mt-2 text-sm text-[#888] leading-relaxed" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ValuePropSection() {
  return (
    <section className="relative z-10 bg-[#1a1a1a] py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-12px_50px_rgba(0,0,0,0.12)]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-[11px] font-medium px-3 py-1.5 rounded-full mb-6">
            <GraduationCap size={12}/>
            <Editable path="home.valueProp.badge" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
            <Editable path="home.valueProp.titlePart1" /><br/>
            <Editable path="home.valueProp.titlePart2" className="text-white/40" />
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-base text-white/50 max-w-lg mx-auto leading-relaxed">
            <Editable path="home.valueProp.body" />
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] text-sm font-medium px-7 py-3.5 rounded-full transition-all hover:gap-3 hover:bg-white/90">
              <Editable path="home.valueProp.ctaLabel" /> <ArrowRight size={14}/>
            </Link>
            <p className="mt-5 text-xs text-white/30">
              <Editable path="home.valueProp.caption" />
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="relative z-10 bg-[#ece7de] py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.07)]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3"><Editable path="home.services.eyebrow" /></motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight"><Editable path="home.services.title" /></motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <EditableList<ServiceItem>
            path="home.services.items"
            template={serviceTemplate}
            itemClassName="bg-white rounded-2xl p-6 border border-black/[0.06]"
            minItems={1}
          >
            {(svc, i) => {
              const Icon = serviceIconMap[svc.iconKey] ?? Globe;
              return (
                <>
                  <div className="w-9 h-9 bg-[#f5f4f2] rounded-xl flex items-center justify-center mb-4">
                    <Icon size={16} className="text-[#1a1a1a]"/>
                  </div>
                  <Editable as="h3" path={`home.services.items[${i}].label`} className="font-semibold text-[#1a1a1a] mb-1" />
                  <Editable as="p" path={`home.services.items[${i}].desc`} className="text-sm text-[#888] leading-relaxed" />
                </>
              );
            }}
          </EditableList>
        </motion.div>
      </div>
    </section>
  );
}

function LocalSection() {
  return (
    <section className="relative z-10 bg-[#f5f4f1] py-20 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3"><Editable path="home.local.eyebrow" /></motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight leading-tight">
              <Editable path="home.local.titlePart1" /><br />
              <Editable path="home.local.titlePart2" />
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-base text-[#666] max-w-xl leading-relaxed">
              <Editable path="home.local.body" />
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="flex flex-col gap-5 lg:min-w-[240px]">
            <EditableList<LocalPoint>
              path="home.local.points"
              template={localPointTemplate}
              itemClassName="flex items-start gap-3.5"
              minItems={1}
            >
              {(item, i) => {
                const Icon = localIconMap[item.iconKey] ?? MapPin;
                return (
                  <>
                    <div className="w-9 h-9 bg-[#f5f4f2] rounded-xl flex items-center justify-center flex-shrink-0 border border-black/[0.06]">
                      <Icon size={15} className="text-[#1a1a1a]" />
                    </div>
                    <div>
                      <Editable as="div" path={`home.local.points[${i}].label`} className="text-sm font-semibold text-[#1a1a1a]" />
                      <Editable as="div" path={`home.local.points[${i}].sub`} className="text-xs text-[#999] mt-0.5" />
                    </div>
                  </>
                );
              }}
            </EditableList>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="relative z-10 bg-white py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.09)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3"><Editable path="home.about.eyebrow" /></motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight leading-tight">
            <Editable path="home.about.titlePart1" /><br/>
            <Editable path="home.about.titlePart2" />
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-4">
            <EditableList<string>
              path="home.about.paragraphs"
              template=""
              minItems={1}
            >
              {(_para, i) => (
                <Editable as="p" path={`home.about.paragraphs[${i}]`} className="text-base text-[#666] leading-relaxed" />
              )}
            </EditableList>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-2">
            <EditableList<string>
              path="home.about.bullets"
              template="New benefit"
              itemClassName="flex items-start gap-2.5"
              minItems={1}
            >
              {(_pt, i) => (
                <>
                  <Check size={14} className="text-[#1a1a1a] mt-0.5 flex-shrink-0"/>
                  <Editable path={`home.about.bullets[${i}]`} className="text-sm text-[#555]" />
                </>
              )}
            </EditableList>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] hover:gap-3 transition-all">
              <Editable path="home.about.ctaLabel" /> <ArrowRight size={14}/>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          className="rounded-3xl bg-[#1a1a1a] h-80 md:h-96 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-white/[0.04] rounded-full blur-2xl"/>
          <div className="text-center relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/10 border border-white/15 mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">VDT</span>
            </div>
            <Editable as="div" path="home.about.card.name" className="text-sm text-white/80 font-medium" />
            <Editable as="div" path="home.about.card.sub" className="text-xs text-white/40 mt-1" />
            <div className="flex flex-col items-center gap-2 mt-4">
              <EditableList<string>
                path="home.about.card.tags"
                template="New tag"
                itemClassName="inline-block"
                minItems={1}
              >
                {(_tag, i) => (
                  <Editable as="span" path={`home.about.card.tags[${i}]`} className="text-[10px] text-white/30 bg-white/5 px-3 py-1 rounded-full" />
                )}
              </EditableList>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="relative z-10 bg-[#f7f3ee] py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3"><Editable path="home.process.eyebrow" /></motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight">
            <Editable path="home.process.titlePart1" /><br/>
            <Editable path="home.process.titlePart2" />
          </motion.h2>
        </motion.div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <EditableList<ProcessStep>
            path="home.process.steps"
            template={processStepTemplate}
            itemClassName="bg-white rounded-2xl p-8 border border-black/[0.06]"
            minItems={1}
          >
            {(_item, i) => (
              <>
                <Editable as="div" path={`home.process.steps[${i}].step`} className="text-4xl font-semibold text-black/[0.06] mb-5 font-mono" />
                <Editable as="h3" path={`home.process.steps[${i}].title`} className="text-lg font-semibold text-[#1a1a1a] mb-3" />
                <Editable as="p" path={`home.process.steps[${i}].desc`} className="text-[#888] text-sm leading-relaxed" />
              </>
            )}
          </EditableList>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative z-10 bg-white py-32 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-[3.5rem] font-semibold text-[#1a1a1a] tracking-tight">
            <Editable path="home.cta.title" />
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg text-[#888] max-w-md mx-auto">
            <Editable path="home.cta.subtitle" />
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-base font-medium px-9 py-4 rounded-full hover:bg-black transition-all hover:gap-3 hover:shadow-2xl">
              <Editable path="home.cta.buttonLabel" /> <ArrowRight size={16}/>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const sectionRenderers: Record<SectionKey, () => ReactNode> = {
  hero: HeroSection,
  marquee: MarqueeSection,
  showcase: ShowcaseSection,
  valueProp: ValuePropSection,
  services: ServicesSection,
  local: LocalSection,
  about: AboutSection,
  process: ProcessSection,
  cta: CtaSection,
};

/* ─── Page ─────────────────────────────────────────────── */
export default function HomePage() {
  const { content } = useContentCtx();
  // Defensive: if KV-stored sectionOrder is somehow missing a key the
  // renderer knows about, append it; if it has unknown keys, ignore them.
  const order: SectionKey[] = (content.home.sectionOrder ?? []).filter((k) =>
    (SECTION_KEYS as readonly string[]).includes(k)
  ) as SectionKey[];
  for (const k of SECTION_KEYS) {
    if (!order.includes(k)) order.push(k);
  }

  return (
    <div className="bg-white">
      <EditableList<SectionKey>
        path="home.sectionOrder"
        template={"cta"}
        disableInsert
        disableRemove
        dragMode="handle-only"
        toolbarPosition="top-4 right-4"
        minItems={order.length}
      >
        {(key) => {
          const Section = sectionRenderers[key];
          return Section ? <Section /> : null;
        }}
      </EditableList>
    </div>
  );
}
