"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-36 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Left */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mb-4">
                Contact
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                Let&apos;s build<br />something great.
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-[#6e6e73] leading-relaxed">
                Got a project in mind? Not sure where to start? Reach out and
                we&apos;ll figure out what&apos;s possible together.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10 space-y-4">
                <a
                  href="mailto:Phillip.Treitel@gmail.com"
                  className="flex items-center gap-3 text-[#1d1d1f] hover:text-[#6e6e73] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-[#e8e8ed] transition-colors">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm font-medium">Phillip.Treitel@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-[#6e6e73]">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <span className="text-sm">Vancouver Island, BC, Canada</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.form
                variants={fadeUp}
                action={`mailto:Phillip.Treitel@gmail.com`}
                method="POST"
                encType="text/plain"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1d1d1f] placeholder:text-[#6e6e73] focus:outline-none focus:border-[#1d1d1f] transition-colors bg-[#f5f5f7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1d1d1f] placeholder:text-[#6e6e73] focus:outline-none focus:border-[#1d1d1f] transition-colors bg-[#f5f5f7]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1d1d1f] mb-2">Business / Project Name</label>
                  <input
                    type="text"
                    name="business"
                    placeholder="e.g. My Café, My Portfolio..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1d1d1f] placeholder:text-[#6e6e73] focus:outline-none focus:border-[#1d1d1f] transition-colors bg-[#f5f5f7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1d1d1f] mb-2">What type of site?</label>
                  <select
                    name="type"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] transition-colors bg-[#f5f5f7] appearance-none"
                  >
                    <option value="">Select one...</option>
                    <option>Landing Page</option>
                    <option>Portfolio</option>
                    <option>Small Business Site</option>
                    <option>Online Store</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1d1d1f] mb-2">Tell me about your project</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="What are you looking to build? Any ideas, inspo, or goals you have in mind..."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1d1d1f] placeholder:text-[#6e6e73] focus:outline-none focus:border-[#1d1d1f] transition-colors bg-[#f5f5f7] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1d1d1f] text-white text-sm font-medium py-3.5 rounded-xl hover:bg-[#3d3d3f] transition-colors"
                >
                  Send Message
                </button>
                <p className="text-xs text-[#6e6e73] text-center">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
