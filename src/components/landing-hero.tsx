import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import FadeUp from "@/animation/fade-up";
import Image from "next/image";

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
                  WEB & MOBILE APPLICATION DEVELOPMENT
                </span>
                <h2 className="bg-accent bg-clip-text py-2 text-5xl font-bold text-transparent sm:text-6xl md:text-7xl xl:text-8xl">
                  High-Performance Software, Built to Scale
                </h2>
              </FadeUp>
              <FadeUp key="description" duration={0.6} delay={0.2}>
                <div className="mt-10 max-w-4xl text-base text-zinc-700 dark:text-zinc-300 sm:text-base md:text-lg">
                  <p className="mb-4">
                    Welcome to <span className="font-bold text-accent">Senzura CodeLabs</span>, your global partner for Web, Mobile, and Cloud Development.
                  </p>
                  <p className="mb-4">
                    We craft powerful digital products that combine modern UI/UX, robust engineering, cloud infrastructure, and AI integration to help businesses grow, scale, and succeed.
                  </p>
                  <p>
                    From idea to deployment, we deliver secure, high-performance solutions built with cutting-edge technology.
                  </p>
                </div>
              </FadeUp>
              <FadeUp key="cta" duration={0.6} delay={0.4}>
                <div className="mt-8">
                  <a href="#services" className="inline-flex items-center gap-2 font-semibold text-accent hover:gap-3 transition-all">
                    VIEW SERVICES
                    <span>→</span>
                  </a>
                </div>
              </FadeUp>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </>
  );
}
