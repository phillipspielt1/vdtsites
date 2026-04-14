"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Coffee, Leaf, Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const menuItems = [
  { name: "The Sunrise Latte", desc: "Espresso, oat milk, honey, cinnamon", price: "$6.50", tag: "Fan Fave", color: "bg-[#fef3c7]" },
  { name: "Zesty Matcha Bowl", desc: "Matcha, banana, mango, granola", price: "$11.00", tag: "New", color: "bg-[#dcfce7]" },
  { name: "The Classic Drip", desc: "Single origin, light roast, black", price: "$4.00", tag: null, color: "bg-[#fff7ed]" },
  { name: "Berry Burst Smoothie", desc: "Mixed berries, almond milk, chia", price: "$8.50", tag: "Vegan", color: "bg-[#fce7f3]" },
];

export default function PlayfulShowcase() {
  return (
    <div className="bg-[#fffbf5]" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Back bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/[0.06] flex items-center justify-between px-6 h-12">
        <Link href="/" className="flex items-center gap-2 text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
          <ArrowLeft size={13} /> Back to Phillip Treitel
        </Link>
        <span className="text-xs font-medium text-[#1d1d1f]">Style: Playful</span>
        <Link href="/contact" className="text-xs font-medium text-[#1d1d1f] bg-[#f5f5f7] px-3 py-1.5 rounded-full hover:bg-[#e8e8ed] transition-colors">
          Want this style?
        </Link>
      </div>

      {/* ── ZEST CAFÉ MOCK SITE ── */}

      {/* Fictional Nav */}
      <div className="pt-12 bg-[#f97316]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black text-white tracking-tight">Zest Café ☀️</span>
          <nav className="hidden md:flex gap-6 text-sm text-white/80 font-medium">
            <a href="#" className="hover:text-white transition-colors">Menu</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Visit</a>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#f97316] px-6 pb-16 pt-12 overflow-hidden relative">
        {/* Decorative blobs */}
        <div className="absolute -right-20 top-0 w-64 h-64 rounded-full bg-[#fb923c] opacity-40" />
        <div className="absolute -left-10 bottom-0 w-48 h-48 rounded-full bg-[#fed7aa] opacity-30" />

        <div className="max-w-5xl mx-auto relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Coffee size={12} /> Now Open 7am – 6pm
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight">
              Coffee worth<br />getting up for. ☕
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-white/80 text-lg leading-relaxed">
              Fresh brews, wholesome bites, and good vibes only. Locally loved in Nanaimo since 2019.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a href="#" className="bg-white text-[#f97316] text-sm font-bold px-6 py-3 rounded-full hover:bg-[#fff7ed] transition-colors">
                See Our Menu
              </a>
              <a href="#" className="border-2 border-white text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                Find Us
              </a>
            </motion.div>
          </motion.div>

          {/* Big emoji */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 6 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute right-0 top-0 text-[140px] leading-none select-none"
          >
            ☀️
          </motion.div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="bg-[#f97316]">
        <svg viewBox="0 0 1440 60" className="w-full h-12 fill-[#fffbf5]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* Menu */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl font-black text-[#1d1d1f] mb-2">
              What&apos;s good today 🌿
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6e6e73] mb-10">Seasonal ingredients, always fresh.</motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={fadeUp}
                  className={`${item.color} rounded-3xl p-6 flex items-start justify-between group hover:scale-[1.02] transition-transform cursor-pointer`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[#1d1d1f] text-base">{item.name}</h3>
                      {item.tag && (
                        <span className="text-[10px] font-bold bg-[#f97316] text-white px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#6e6e73]">{item.desc}</p>
                  </div>
                  <span className="font-black text-[#1d1d1f] text-base ml-4">{item.price}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-[#fff7ed]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-[#1d1d1f] mb-10">Why we&apos;re different 💛</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "🌱", title: "Plant-First Menu", desc: "Over 80% of our menu is plant-based or easily adaptable." },
              { icon: "☕", title: "Local Roasters Only", desc: "We source beans exclusively from BC-based roasters." },
              { icon: "💛", title: "Community First", desc: "10% of profits go back to local food banks every month." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-3xl p-6 border-2 border-[#fed7aa]">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-[#1d1d1f] mb-2">{v.title}</h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-[#1d1d1f] mb-6">Come say hi 👋</h2>
              <div className="space-y-3">
                {[
                  { day: "Mon – Fri", hours: "7:00 am – 6:00 pm" },
                  { day: "Saturday", hours: "8:00 am – 5:00 pm" },
                  { day: "Sunday", hours: "9:00 am – 3:00 pm" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between text-sm border-b border-[#fed7aa] pb-3">
                    <span className="font-semibold text-[#1d1d1f]">{h.day}</span>
                    <span className="text-[#6e6e73]">{h.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm text-[#6e6e73]">📍 123 Harbour St, Nanaimo, BC</div>
            </div>
            <div className="bg-[#fed7aa] rounded-3xl h-56 flex items-center justify-center text-5xl">
              🗺️
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-6 bg-[#f97316]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8">People love us ⭐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Sarah M.", quote: "Best oat latte on the island, no contest." },
              { name: "Jordan T.", quote: "The vibe is just right. I come here to work every Friday." },
              { name: "Priya L.", quote: "Genuinely the most friendly staff I've ever encountered." },
            ].map((r) => (
              <div key={r.name} className="bg-white/10 backdrop-blur rounded-2xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-white text-white" />)}
                </div>
                <p className="text-white text-sm leading-relaxed mb-3">&quot;{r.quote}&quot;</p>
                <span className="text-white/60 text-xs font-medium">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="bg-[#1d1d1f] py-8 px-6 text-center">
        <p className="text-white/70 text-sm">
          Like this style?{" "}
          <Link href="/contact" className="text-white font-medium underline underline-offset-4 hover:text-white/80 transition-colors">
            Let&apos;s build your playful site →
          </Link>
        </p>
      </div>
    </div>
  );
}
