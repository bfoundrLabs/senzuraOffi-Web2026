import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProjectShowcaseProps {
  projects?: unknown[];
}

function Counter({ target, label, suffix = "+" }: { target: number; label: string; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let rafId: number;
    const duration = 1200;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setValue(Math.floor(eased * target));
      if (t < 1) rafId = requestAnimationFrame(step);
      else setValue(target);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-accent sm:text-6xl md:text-7xl"
      >
        {value}
        {suffix}
      </motion.div>
      <div className="mt-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</div>
    </div>
  );
}

export default function ProjectShowcase(_: ProjectShowcaseProps) {
  return (
    <section className="overflow-hidden px-6 py-28 sm:px-14 md:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.h2 className="text-xl font-semibold text-accent sm:text-3xl mb-8">
          Our Achievements
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Counter target={4} label="Successful Clients" />
          <Counter target={13} label="Successful Projects" />
          <Counter target={2} label="Countries We Operate In" />
        </motion.div>

        <div className="mt-10">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            We partner with ambitious organizations to deliver high-quality software and transformative digital experiences. Interested in working together? Reach out via the contact page.
          </p>
        </div>
      </div>
    </section>
  );
}
