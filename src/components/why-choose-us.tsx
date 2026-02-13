import React from "react";
import FadeUp from "@/animation/fade-up";
import {
  SecurityIcon,
  ChartIcon,
  LightningIcon,
  RefreshIcon,
  RocketIcon,
  TargetIcon,
} from "@/components/icons";

interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    title: "Security-First Architecture",
    description:
      "Every system we build follows security-first principles with encryption, secure auth, and OWASP best practices baked in from day one.",
    icon: SecurityIcon,
  },
  {
    title: "Scalable by Design",
    description:
      "We architect systems that grow with your business — from MVP to millions of users with microservices and cloud-native patterns.",
    icon: ChartIcon,
  },
  {
    title: "Modern Tech Stack",
    description:
      "Next.js, React, Node.js, Flutter, MongoDB, PostgreSQL, Docker, Kubernetes — we use battle-tested technologies.",
    icon: LightningIcon,
  },
  {
    title: "Agile Delivery",
    description:
      "Iterative development with weekly sprints, transparent communication, and rapid delivery cycles to keep your project moving.",
    icon: RefreshIcon,
  },
  {
    title: "Startup DNA",
    description:
      "We understand the startup mindset — move fast, build smart, and iterate. We've been there, and we build for founders.",
    icon: RocketIcon,
  },
  {
    title: "End-to-End Solutions",
    description:
      "From UI design to cloud deployment, we handle the full lifecycle — no need to coordinate between multiple vendors.",
    icon: TargetIcon,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-50 px-6 py-20 dark:bg-zinc-900/50 sm:px-14 md:px-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp duration={0.6}>
          <div className="mb-16">
            <h2 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-100 md:text-5xl">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-transparent">
                Senzura Codelabs
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We&apos;re committed to delivering excellence in every project,
              every day
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <FadeUp key={index} duration={0.6} delay={0.1 * (index + 1)}>
                <div className="group relative rounded-xl border border-[#6C7A89]/20 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2E86A7]/40 hover:shadow-xl dark:border-[#6C7A89]/10 dark:bg-zinc-800">
                  <div className="justify-left mb-4 flex text-3xl text-[#2E86A7]">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
