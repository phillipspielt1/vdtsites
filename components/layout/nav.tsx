"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const showcases = [
  { href: "/showcase/minimal", label: "Minimal" },
  { href: "/showcase/playful", label: "Playful" },
  { href: "/showcase/professional", label: "Professional" },
  { href: "/showcase/bold", label: "Bold & Dark" },
  { href: "/showcase/ecommerce", label: "E-Commerce" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isShowcase = pathname.startsWith("/showcase");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-[#1d1d1f]"
        >
          PT
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[#6e6e73]">
          <Link
            href="/"
            className={`hover:text-[#1d1d1f] transition-colors ${pathname === "/" ? "text-[#1d1d1f]" : ""}`}
          >
            Home
          </Link>

          {/* Showcase dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 hover:text-[#1d1d1f] transition-colors ${isShowcase ? "text-[#1d1d1f]" : ""}`}
            >
              Showcase
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="bg-white rounded-2xl shadow-xl border border-black/[0.08] py-2 min-w-[180px]">
                  {showcases.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2.5 text-sm text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={`hover:text-[#1d1d1f] transition-colors ${pathname === "/contact" ? "text-[#1d1d1f]" : ""}`}
          >
            Contact
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="text-sm font-medium bg-[#1d1d1f] text-white px-4 py-2 rounded-full hover:bg-[#3d3d3f] transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#1d1d1f]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-black/[0.06] px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="text-sm text-[#1d1d1f]" onClick={() => setOpen(false)}>Home</Link>
          <div className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mt-1">Showcase</div>
          {showcases.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="text-sm text-[#1d1d1f] pl-2"
              onClick={() => setOpen(false)}
            >
              {s.label}
            </Link>
          ))}
          <Link href="/contact" className="text-sm text-[#1d1d1f]" onClick={() => setOpen(false)}>Contact</Link>
          <Link
            href="/contact"
            className="text-sm font-medium bg-[#1d1d1f] text-white px-4 py-2.5 rounded-full text-center"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
