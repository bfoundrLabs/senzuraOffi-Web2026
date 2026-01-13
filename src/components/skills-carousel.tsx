import { motion } from "framer-motion";
import Image from "next/image";

const SKILLS_ICONS = [
  "javascript",
  "typescript",
  "reactjs",
  "react-router-color",
  "nodejs",
  "python",
  "tailwindcss",
  "html",
  "css",
  "sass",
  "git",
  "github",
  "aws",
  "docker",
  "mongodb",
  "postgresql",
  "prisma",
  "graphql",
  "redux",
  "vite",
  "postman",
  "vscode",
];

export default function SkillsCarousel() {
  // Double the array for seamless looping
  const doubledSkills = [...SKILLS_ICONS, ...SKILLS_ICONS];

  return (
    <section className="relative w-full overflow-hidden bg-zinc-50 py-20 dark:bg-zinc-900/30 md:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-14 md:px-20">
        <h3 className="mb-16 text-center text-sm font-semibold uppercase tracking-wider text-accent">
          Technologies We Work With
        </h3>

        {/* Scrolling Container */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-40 bg-gradient-to-r from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-900/30 dark:via-zinc-900/30 dark:to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-40 bg-gradient-to-l from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-900/30 dark:via-zinc-900/30 dark:to-transparent" />

          <motion.div
            className="flex items-center justify-center gap-8 py-8"
            animate={{ x: [0, -1440] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {doubledSkills.map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-accent/30 bg-white p-0 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/30 dark:bg-zinc-800 dark:border-accent/40 dark:hover:shadow-accent/20">
                  <Image
                    src={`/icons/${skill}.svg`}
                    alt={skill}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain drop-shadow-sm"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
