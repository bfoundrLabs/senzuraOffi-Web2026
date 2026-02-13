import Image from "next/image";
import Link from "next/link";

import { AnimatePresence } from "framer-motion";

import FadeUp from "@/animation/fade-up";
import FadeRight from "@/animation/fade-right";
import heroProfileImg from "@/public/images/heroProfile.png";
import DuotoneImage from "./duotone-image";

export default function AboutHero() {
  return (
    <div className="mx-auto mt-0 flex max-w-7xl flex-col items-center gap-6 px-6 pt-20 text-center sm:px-14 md:mt-20 md:px-20 lg:mt-0 lg:flex-row lg:text-left">
      <div className="w-full sm:w-1/2 md:w-2/3 lg:inline-block lg:h-full lg:w-1/2">
        <AnimatePresence>
          <FadeUp key="hero-image" duration={0.6}>
            <DuotoneImage
              src={heroProfileImg}
              width={100}
              height={100}
              className="h-auto w-full px-0 xl:px-16"
              alt="Senzura Codelabs Team"
              lightColor="#E0FFFF"
              darkColor="#004D4D"
              unoptimized
            />
          </FadeUp>
        </AnimatePresence>
      </div>
      <div className="sm:1/2 mt-10 w-full lg:w-1/2">
        <AnimatePresence>
          <FadeUp key="title-greeting" duration={0.6}>
            <h1 className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-6xl font-bold text-transparent sm:text-7xl md:text-6xl lg:text-5xl xl:text-7xl">
              About Senzura Codelabs
            </h1>
          </FadeUp>
          <FadeUp key="description-1" duration={0.6} delay={0.2}>
            <p className="mt-8 text-base font-medium text-zinc-900 dark:text-zinc-300 sm:text-lg md:text-lg">
              Senzura Codelabs is a modern software engineering company focused
              on building{" "}
              <span className="font-bold text-accent">
                secure, scalable, and future-ready
              </span>{" "}
              digital platforms. We specialize in full-stack web development,
              mobile applications, cloud systems, and distributed architectures.
            </p>
          </FadeUp>
          <FadeUp key="mission" duration={0.6} delay={0.4}>
            <div className="mt-8 rounded-xl border border-[#2E86A7]/20 bg-gradient-to-br from-[#2E86A7]/5 to-[#1F5F75]/5 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                Our Mission
              </h3>
              <p className="text-base font-medium text-zinc-900 dark:text-zinc-300 sm:text-lg">
                To deliver secure and innovative technology solutions that
                empower businesses worldwide.
              </p>
            </div>
          </FadeUp>
          <FadeUp key="description-2" duration={0.6} delay={0.6}>
            <p className="mt-8 text-base font-medium text-zinc-900 dark:text-zinc-300 sm:text-lg md:text-lg">
              From innovative web applications to cloud-native solutions, we
              focus on user-centric design and scalable architecture. Explore
              our{" "}
              <Link href="/projects" className="underline underline-offset-4">
                <span className="text-accent">portfolio</span>
              </Link>{" "}
              to see how we&apos;ve helped businesses succeed.
            </p>
          </FadeUp>
          <FadeRight
            key="hero-location"
            duration={0.6}
            delay={0.8}
            className="mr-0 mt-8 flex items-center justify-center gap-4 lg:mr-8 lg:justify-end"
          >
            <div className="relative flex w-12 gap-4 overflow-hidden rounded-md">
              <Image
                className="-z-10 h-full w-full bg-cover bg-no-repeat"
                alt="Indian flag"
                src="https://flagcdn.com/in.svg"
                width={15}
                height={15}
              />
            </div>
            <span className="text-lg font-medium text-foreground">
              Colombo, Sri Lanka
            </span>
          </FadeRight>
        </AnimatePresence>
      </div>
    </div>
  );
}
