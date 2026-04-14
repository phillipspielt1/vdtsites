"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ShoppingBag, User, Zap, Layers } from "lucide-react";

const showcases = [
  {
    href: "/showcase/minimal",
    label: "Minimal",
    tag: "Photography · Portfolio",
    description: "Clean lines, breathable space, and purposeful typography. Perfect for creatives who want their work to speak.",
    bg: "bg-white",
    border: "border border-black/10",
    accent: "bg-[#1d1d1f]",
    dark: false,
  },
  {
    href: "/showcase/playful",
    label: "Playful",
    tag: "Café · Food & Drink",
    description: "Bold colours, rounded shapes, and a personality that jumps off the screen. Great for brands with energy.",
    bg: "bg-[#fff7ed]",
    border: "border border-orange-200",
    accent: "bg-[#f97316]",
    dark: false,
  },
  {
    href: "/showcase/professional",
    label: "Professional",
    tag: "Finance · Consulting",
    description: "Structured, trustworthy, and polished. Ideal for businesses that need to project authority and credibility.",
    bg: "bg-[#f0f4ff]",
    border: "border border-blue-200",
    accent: "bg-[#1e3a8a]",
    dark: false,
  },
  {
    href: "/showcase/bold",
    label: "Bold & Dark",
    tag: "Events · Luxury",
    description: "Dramatic contrast, cinematic presence. For brands that want to make an unforgettable first impression.",
    bg: "bg-[#0f0f0f]",
    border: "border border-white/10",
    accent: "bg-[#d4af37]",
    dark: true,
  },
  {
    href: "/showcase/ecommerce",
    label: "E-Commerce",
    tag: "Retail · Artisan Goods",
    description: "Warm, inviting, and conversion-focused. Showcases products beautifully while guiding visitors to buy.",
    bg: "bg-[#faf6f1]",
    border: "border border-amber-200",
    accent: "bg-[#92400e]",
    dark: false,
  },
];

const services = [
  { icon: Globe, label: "Landing Pages", desc: "Single-page sites that convert visitors into customers." },
  { icon: User, label: "Portfolios", desc: "Showcase your work with a site that gets you noticed." },
  { icon: ShoppingBag, label: "Online Stores", desc: "Sell products online with a smooth shopping experience." },
  { icon: Zap, label: "Small Business Sites", desc: "Multi-page sites with everything your business needs." },
  { icon: Layers, label: "Custom Builds", desc: "Have something unique in mind? Let's figure it out together." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center pt-14 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-4xl">
            <motion.p variants={fadeUp} className="text-sm font-medium text-[#6e6e73] mb-6 tracking-wide uppercase">
              Web Design · Vancouver Island, BC
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-semibold text-[#1d1d1f] leading-[1.05] tracking-tight">
              Websites that<br />mean business.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 text-xl md:text-2xl text-[#6e6e73] max-w-2xl leading-relaxed">
              Custom websites for small businesses, portfolios, and online stores —
              built to look great and get results.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1d1d1f] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#3d3d3f] transition-colors"
              >
                Get a free quote <ArrowRight size={15} />
              </Link>
              <Link
                href="#showcase"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] px-6 py-3 rounded-full border border-black/20 hover:bg-[#f5f5f7] transition-colors"
              >
                See my work
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-24 flex items-center gap-3 text-xs text-[#6e6e73]"
          >
            <div className="w-8 h-[1px] bg-[#6e6e73]" />
            Scroll to explore
          </motion.div>
        </div>
      </section>

      {/* Showcase grid */}
      <section id="showcase" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mb-4">
              Design Showcase
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight max-w-xl">
              Every business is different.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-[#6e6e73] max-w-xl">
              Browse five distinct design styles. Each one is a fully built demo — click through to see the real layout in action.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {showcases.map((s) => (
              <motion.div key={s.href} variants={fadeUp}>
                <Link
                  href={s.href}
                  className={`group block rounded-3xl ${s.bg} ${s.border} p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className={`text-xs font-medium uppercase tracking-widest ${s.dark ? "text-white/40" : "text-[#6e6e73]"}`}>
                        {s.tag}
                      </span>
                      <h3 className={`mt-1 text-2xl font-semibold tracking-tight ${s.dark ? "text-white" : "text-[#1d1d1f]"}`}>
                        {s.label}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full ${s.accent} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Abstract preview */}
                  <div className={`rounded-2xl h-28 ${s.dark ? "bg-white/5 border border-white/10" : "bg-black/[0.04]"} mb-6 overflow-hidden flex items-end p-4`}>
                    <div className="w-full space-y-1.5">
                      <div className={`h-2 w-3/4 rounded-full ${s.dark ? "bg-white/20" : "bg-black/15"}`} />
                      <div className={`h-1.5 w-1/2 rounded-full ${s.dark ? "bg-white/10" : "bg-black/10"}`} />
                      <div className={`h-1.5 w-2/3 rounded-full ${s.dark ? "bg-white/10" : "bg-black/10"}`} />
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed ${s.dark ? "text-white/60" : "text-[#6e6e73]"}`}>
                    {s.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-6 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mb-4">
              What I Build
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
              One builder,<br />every need.
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {services.map((svc) => (
              <motion.div key={svc.label} variants={fadeUp} className="bg-white rounded-2xl p-6 border border-black/[0.06]">
                <div className="w-10 h-10 bg-[#f5f5f7] rounded-xl flex items-center justify-center mb-4">
                  <svc.icon size={18} className="text-[#1d1d1f]" />
                </div>
                <h3 className="font-semibold text-[#1d1d1f] text-base mb-1">{svc.label}</h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mb-4">
                About Me
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
                Young, driven,<br />built for this.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-[#6e6e73] leading-relaxed">
                I&apos;m Phillip Treitel — a student at VIU studying International Business and Marketing,
                and a varsity volleyball player on Vancouver Island.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-4 text-lg text-[#6e6e73] leading-relaxed">
                I combine a genuine passion for design with a business-minded approach. Every site I build
                is crafted to not just look good, but to actually work for your goals.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] hover:gap-3 transition-all">
                  Let&apos;s work together <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="rounded-3xl bg-[#f5f5f7] h-80 md:h-96 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#1d1d1f] mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">PT</span>
                </div>
                <div className="text-sm text-[#6e6e73]">Phillip Treitel</div>
                <div className="text-xs text-[#6e6e73]/70 mt-0.5">VIU · Vancouver Island, BC</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-6 bg-[#1d1d1f]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-white/40 font-medium mb-4">
              How it Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Simple process.<br />Great results.
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { step: "01", title: "Discovery", desc: "We chat about your business, goals, and what you need. No jargon, no pressure — just a real conversation." },
              { step: "02", title: "Design & Build", desc: "I design and build your site from scratch, sending you updates along the way. You stay in the loop." },
              { step: "03", title: "Launch", desc: "Your site goes live. I make sure everything is working perfectly and you know how to manage it." },
            ].map((item) => (
              <motion.div key={item.step} variants={fadeUp}>
                <div className="text-5xl font-semibold text-white/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight">
              Ready to get started?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-xl text-[#6e6e73] max-w-lg mx-auto">
              Tell me about your project and I&apos;ll get back to you with ideas and a quote.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1d1d1f] text-white text-base font-medium px-8 py-4 rounded-full hover:bg-[#3d3d3f] transition-colors"
              >
                Get in touch <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
