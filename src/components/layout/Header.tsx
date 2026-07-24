"use client";

import { logo, navLinks, siteConfig } from "@/data/site";
import { BookCta } from "@/components/ui/BookCta";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const homeHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-primary/8 bg-white py-3 shadow-[0_2px_24px_rgba(112,48,160,0.08)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-10 flex min-w-0 items-center">
          <Image
            src={logo.default}
            alt="HABITADAS — Empresa psicosocial"
            width={200}
            height={90}
            className="h-10 w-auto object-contain sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const href = link.href.startsWith("#") ? homeHref(link.href) : link.href;
            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={href}
                  className="flex items-center gap-1 font-subtitle text-sm text-foreground/75 transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        openDropdown === link.label && "rotate-180",
                      )}
                    />
                  )}
                </Link>
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      transition={{ duration: 0.3, ease: [0.24, 1, 0.3, 1] }}
                      className="absolute top-full left-0 mt-2 w-72 overflow-hidden rounded-xl bg-white py-2 shadow-xl ring-1 ring-primary/10"
                    >
                      {link.children.map((child, i) => (
                        <motion.div
                          key={child.label}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link
                            href={child.href.startsWith("#") ? homeHref(child.href) : child.href}
                            className="block px-4 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-violet-light/50 hover:text-primary-dark"
                          >
                            {child.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-subtitle text-sm text-primary-dark transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{siteConfig.phone}</span>
          </a>
          <BookCta className="rounded-full bg-primary px-5 py-2.5 font-subtitle text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25">
            Agenda tu cita
          </BookCta>
        </div>

        <button
          className="relative z-10 rounded-lg p-2 text-primary-dark lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.24, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-primary/10 bg-white lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href.startsWith("#") ? homeHref(link.href) : link.href}
                    className="block py-3 font-subtitle text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href.startsWith("#") ? homeHref(child.href) : child.href}
                      className="block py-2 pl-4 text-sm text-foreground/60"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              ))}
              <BookCta
                className="mt-2 rounded-full bg-primary py-3 text-center text-white"
              >
                Agenda tu cita
              </BookCta>
              <Link
                href={homeHref("#contacto")}
                className="mt-2 rounded-full border border-primary/20 py-3 text-center text-primary"
                onClick={() => setIsOpen(false)}
              >
                Contáctanos
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
