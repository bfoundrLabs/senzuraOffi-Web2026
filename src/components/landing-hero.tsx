import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import FadeUp from "@/animation/fade-up";
import Link from "next/link";

export default function LandingHero() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  let progress = 0;
  const { current: elContainer } = ref;

  if (elContainer) {
    progress = Math.min(0, scrollY / elContainer.clientHeight);
  }

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.section
        animate={{
          transform: `translateY(${progress * 0}vh)`,
        }}
        transition={{ type: "spring", stiffness: 100 }}
        ref={ref}
        className="pointer-events-none flex max-h-[1000px] min-h-[calc(100vh-200px)] items-center px-6 pt-24 sm:px-14 md:h-[calc(100vh-200px)] md:min-h-max md:px-20"
      >
        <div className="w-full">
          <div className="mx-auto max-w-7xl">
            <AnimatePresence>
              <FadeUp key="title-main" duration={0.6}>
                <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Secure Software Engineering
                </span>
                <h1 className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text py-2 text-5xl font-bold text-transparent sm:text-6xl md:text-7xl xl:text-8xl">
                  Engineering Secure Digital Futures.
                </h1>
              </FadeUp>
              <FadeUp key="description" duration={0.6} delay={0.2}>
                <div className="mt-10 max-w-4xl text-base text-zinc-700 dark:text-zinc-300 sm:text-base md:text-lg">
                  <p className="mb-4">
                    We build{" "}
                    <span className="font-bold text-accent">
                      secure, scalable, and high-performance
                    </span>{" "}
                    digital solutions for startups and enterprises.
                  </p>
                  <p>
                    From idea to deployment,{" "}
                    <span className="font-semibold text-accent">
                      Senzura Codelabs
                    </span>{" "}
                    delivers future-ready platforms with modern architecture,
                    cloud infrastructure, and security-first engineering.
                  </p>
                </div>
              </FadeUp>
              <FadeUp key="cta" duration={0.6} delay={0.4}>
                <div className="pointer-events-auto mt-10 flex flex-wrap gap-4">
                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(46,134,167,0.4)]"
                  >
                    Start Your Project
                  </a>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#2E86A7] px-8 py-3 text-sm font-semibold text-[#2E86A7] transition-all duration-300 hover:scale-105 hover:bg-[#2E86A7]/10"
                  >
                    Explore Our Work
                  </Link>
                </div>
              </FadeUp>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </>
  );
}
