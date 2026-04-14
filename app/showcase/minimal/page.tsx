"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const works = [
  { title: "Coastal Light", category: "Landscape", aspect: "aspect-[3/4]", bg: "bg-[#d4d0cb]" },
  { title: "Still Life III", category: "Editorial", aspect: "aspect-square", bg: "bg-[#c8cfc8]" },
  { title: "Morning Study", category: "Portrait", aspect: "aspect-[4/3]", bg: "bg-[#d9d4cc]" },
  { title: "Untitled No. 7", category: "Abstract", aspect: "aspect-[3/4]", bg: "bg-[#ccccc8]" },
  { title: "Open Road", category: "Travel", aspect: "aspect-[16/9]", bg: "bg-[#c4c8cc]" },
  { title: "Form Study", category: "Fine Art", aspect: "aspect-square", bg: "bg-[#d0cccc]" },
];

export default function MinimalShowcase() {
  return (
    <div className="bg-white">
      {/* Back bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/[0.06] flex items-center justify-between px-6 h-12">
        <Link href="/" className="flex items-center gap-2 text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
          <ArrowLeft size={13} /> Back to Phillip Treitel
        </Link>
        <span className="text-xs font-medium text-[#1d1d1f]">Style: Minimal</span>
        <Link href="/contact" className="text-xs font-medium text-[#1d1d1f] bg-[#f5f5f7] px-3 py-1.5 rounded-full hover:bg-[#e8e8ed] transition-colors">
          Want this style?
        </Link>
      </div>

      {/* ── MARA STUDIO MOCK SITE ── */}

      {/* Fictional Nav */}
      <div className="pt-12 border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm font-medium tracking-widest uppercase text-[#1d1d1f]">Mara Studio</span>
          <nav className="hidden md:flex gap-8 text-xs text-[#6e6e73]">
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Work</a>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">About</a>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Services</a>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Contact</a>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-32">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#6e6e73] mb-8">
            Photography & Visual Art
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-light text-[#1d1d1f] tracking-tight leading-none">
            Light.<br />Form.<br />Feeling.
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-12 flex items-end justify-between flex-wrap gap-6">
            <p className="text-base text-[#6e6e73] max-w-xs leading-relaxed">
              Mara Chen is a fine art photographer based in Victoria, BC. Available for editorial, portrait, and commercial work.
            </p>
            <a href="#" className="flex items-center gap-2 text-sm text-[#1d1d1f] font-medium border-b border-[#1d1d1f] pb-0.5 hover:text-[#6e6e73] hover:border-[#6e6e73] transition-colors">
              View portfolio <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Full-bleed placeholder image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-[60vh] bg-[#d4d0cb] flex items-center justify-center"
      >
        <span className="text-[#a8a49d] text-xs tracking-widest uppercase">Hero Image</span>
      </motion.div>

      {/* Work grid */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-light text-[#1d1d1f] tracking-tight">Selected Work</h2>
            <a href="#" className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">View all →</a>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {works.map((w) => (
              <motion.div key={w.title} variants={fadeUp} className="group cursor-pointer">
                <div className={`${w.aspect} ${w.bg} w-full rounded-sm overflow-hidden relative flex items-center justify-center`}>
                  <span className="text-xs text-white/40 tracking-widest uppercase">{w.category}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <div>
                      <div className="text-white text-sm font-medium">{w.title}</div>
                      <div className="text-white/70 text-xs">{w.category}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section className="border-t border-black/[0.06] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="h-64 bg-[#e8e4de] rounded-sm flex items-center justify-center">
              <span className="text-xs text-[#a8a49d] tracking-widest uppercase">Portrait Photo</span>
            </div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#6e6e73] mb-6">About</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl font-light text-[#1d1d1f] leading-snug">
                Guided by light, drawn to quiet moments.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-sm text-[#6e6e73] leading-loose">
                Mara has spent over a decade documenting the world with a careful eye and a patient hand.
                Her work has appeared in publications across North America and Europe.
              </motion.p>
              <motion.a variants={fadeUp} href="#" className="inline-block mt-8 text-xs text-[#1d1d1f] border-b border-[#1d1d1f] pb-0.5 hover:text-[#6e6e73] transition-colors">
                Read more
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-[#f9f8f7]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73] mb-10">Services</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/[0.06]">
            {["Editorial", "Portrait", "Commercial"].map((s) => (
              <div key={s} className="bg-[#f9f8f7] p-8">
                <h3 className="text-lg font-light text-[#1d1d1f] mb-3">{s}</h3>
                <p className="text-xs text-[#6e6e73] leading-loose">
                  Thoughtful, collaborative sessions tailored to your vision and publication needs.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 max-w-5xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73] mb-6">Available for projects</p>
        <h2 className="text-4xl md:text-5xl font-light text-[#1d1d1f]">Let&apos;s make something together.</h2>
        <a href="#" className="inline-block mt-10 text-sm text-[#1d1d1f] border border-[#1d1d1f] px-8 py-3 hover:bg-[#1d1d1f] hover:text-white transition-colors">
          Get in touch
        </a>
      </section>

      {/* CTA Banner */}
      <div className="bg-[#1d1d1f] py-8 px-6 text-center">
        <p className="text-white/70 text-sm">
          Like this style?{" "}
          <Link href="/contact" className="text-white font-medium underline underline-offset-4 hover:text-white/80 transition-colors">
            Let&apos;s build your minimal site →
          </Link>
        </p>
      </div>
    </div>
  );
}
