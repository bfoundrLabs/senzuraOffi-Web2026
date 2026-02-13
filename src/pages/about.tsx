import { NextSeo } from "next-seo";
import { AnimatePresence } from "framer-motion";

import FadeUp from "@/animation/fade-up";
import Link from "next/link";
import {
  SecurityIcon,
  RocketIcon,
  PuzzleIcon,
  HandshakeIcon,
  LightBulbIcon,
  CheckIcon,
  TargetIcon,
  TelescopeIcon,
} from "@/components/icons";
import { siteMetadata } from "@/data/siteMetaData.mjs";

const CORE_VALUES = [
  {
    icon: SecurityIcon,
    title: "Security First",
    description:
      "Every line of code, every architecture decision starts with security. We build systems you can trust.",
  },
  {
    icon: RocketIcon,
    title: "Ship Fast, Ship Right",
    description:
      "We move at startup speed without cutting corners. Agile sprints, rapid iteration, production-grade quality.",
  },
  {
    icon: PuzzleIcon,
    title: "Scalable Architecture",
    description:
      "We design for 10x growth from day one. Microservices, cloud-native, horizontally scalable systems.",
  },
  {
    icon: HandshakeIcon,
    title: "Client Partnership",
    description:
      "We're not just vendors — we're your technical co-founders. Transparent, collaborative, and committed.",
  },
  {
    icon: LightBulbIcon,
    title: "Innovation Driven",
    description:
      "We stay ahead of the curve with modern frameworks, emerging tech, and continuous learning.",
  },
  {
    icon: CheckIcon,
    title: "Quality Obsessed",
    description:
      "Automated testing, code reviews, CI/CD, monitoring — quality is embedded in every step.",
  },
];

const TEAM_MEMBERS = [
  {
    role: "Founder & Lead Engineer",
    focus: "Architecture, Strategy & Full-Stack Engineering",
    description:
      "Drives the technical vision and ensures every system we build meets our high security and performance standards.",
  },
  {
    role: "Full Stack Developer",
    focus: "Next.js, Node.js, MongoDB & APIs",
    description:
      "Builds end-to-end features, from database schemas to pixel-perfect frontends, with production-ready code.",
  },
  {
    role: "UI/UX Engineer",
    focus: "Design Systems, Figma & Frontend",
    description:
      "Crafts intuitive, accessible interfaces and translates complex workflows into elegant user experiences.",
  },
  {
    role: "Cloud Architect",
    focus: "AWS, Docker, Kubernetes & CI/CD",
    description:
      "Designs cloud infrastructure, manages deployments, and ensures 99.9% uptime with automated scaling.",
  },
];

const TECH_STACK = [
  {
    category: "Frontend",
    tools: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion",
  },
  { category: "Backend", tools: "Node.js, Express, GraphQL, REST APIs" },
  { category: "Mobile", tools: "Flutter, React Native" },
  { category: "Database", tools: "MongoDB, PostgreSQL, Redis, Prisma" },
  {
    category: "Cloud & DevOps",
    tools: "AWS, GCP, Docker, Kubernetes, GitHub Actions",
  },
  { category: "Tools", tools: "Git, Figma, Postman, VS Code, Vercel" },
];

export default function About() {
  return (
    <>
      <NextSeo
        title="About Senzura Codelabs | Secure Software Engineering"
        description="Learn about Senzura Codelabs - a modern software engineering company focused on building secure, scalable, and future-ready digital platforms."
        canonical={`${siteMetadata.siteUrl}/about`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/about`,
          title: "About Senzura Codelabs — Our Mission & Expertise",
          description:
            "Discover Senzura Codelabs' team, expertise in full-stack web development, mobile apps, cloud systems, and our commitment to security-first engineering.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Senzura Codelabs - About Our Company",
            },
          ],
          siteName: siteMetadata.siteName,
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "Senzura Codelabs, about, software engineering, secure systems, full-stack development, cloud architecture, team",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:px-14 md:px-20">
        <AnimatePresence>
          <FadeUp key="about-title" duration={0.6}>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              About Us
            </span>
            <h1 className="mt-3 bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              We Engineer Secure Digital Futures
            </h1>
          </FadeUp>
          <FadeUp key="about-desc" duration={0.6} delay={0.2}>
            <p className="mt-8 max-w-3xl text-lg text-zinc-700 dark:text-zinc-300">
              Senzura Codelabs is a modern software engineering company focused
              on building{" "}
              <span className="font-bold text-accent">
                secure, scalable, and future-ready
              </span>{" "}
              digital platforms. We specialize in full-stack web development,
              mobile applications, cloud systems, and distributed architectures.
            </p>
          </FadeUp>
        </AnimatePresence>
      </section>

      {/* Mission & Vision */}
      <section className="bg-zinc-50 px-6 py-20 dark:bg-zinc-900/50 sm:px-14 md:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <AnimatePresence>
            <FadeUp key="mission" duration={0.6}>
              <div className="rounded-2xl border border-[#2E86A7]/20 bg-white p-8 shadow-sm dark:border-[#2E86A7]/10 dark:bg-zinc-800">
                <div className="mb-4 flex justify-center text-3xl text-[#2E86A7]">
                  <TargetIcon className="h-8 w-8" />
                </div>
                <h2 className="mb-3 text-2xl font-bold text-foreground">
                  Our Mission
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  To deliver secure and innovative technology solutions that
                  empower businesses worldwide. We believe every startup and
                  enterprise deserves access to world-class engineering.
                </p>
              </div>
            </FadeUp>
            <FadeUp key="vision" duration={0.6} delay={0.15}>
              <div className="rounded-2xl border border-[#2E86A7]/20 bg-white p-8 shadow-sm dark:border-[#2E86A7]/10 dark:bg-zinc-800">
                <div className="mb-4 flex justify-center text-3xl text-[#2E86A7]">
                  <TelescopeIcon className="h-8 w-8" />
                </div>
                <h2 className="mb-3 text-2xl font-bold text-foreground">
                  Our Vision
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  To become the go-to engineering partner for ambitious startups
                  and growing enterprises — trusted for security, speed, and
                  scalable architecture.
                </p>
              </div>
            </FadeUp>
          </AnimatePresence>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-14 md:px-20">
        <AnimatePresence>
          <FadeUp key="story-title" duration={0.6}>
            <h2 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-transparent">
                Story
              </span>
            </h2>
          </FadeUp>
          <FadeUp key="story-content" duration={0.6} delay={0.2}>
            <div className="max-w-4xl space-y-6 text-base text-zinc-700 dark:text-zinc-300 md:text-lg">
              <p>
                Senzura Codelabs was born from a simple frustration: too many
                startups were shipping insecure, poorly architected software
                because they couldn&apos;t afford top-tier engineering. We set
                out to change that.
              </p>
              <p>
                Founded in 2024 in Colombo, Sri Lanka, we started as a small
                team of engineers passionate about building things the right way
                —{" "}
                <span className="font-semibold text-accent">
                  secure by default, scalable from day one, and beautiful in
                  every detail
                </span>
                .
              </p>
              <p>
                Today, we work with startups and enterprises across multiple
                countries, helping them build products that users love and
                systems that engineering teams are proud of. From MVPs to
                production-grade platforms, we bring the same level of care and
                craft to every project.
              </p>
            </div>
          </FadeUp>
        </AnimatePresence>
      </section>

      {/* Core Values */}
      <section className="bg-zinc-50 px-6 py-20 dark:bg-zinc-900/50 sm:px-14 md:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeUp duration={0.6}>
            <h2 className="mb-12 text-3xl font-bold text-foreground md:text-4xl">
              Core{" "}
              <span className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-transparent">
                Values
              </span>
            </h2>
          </FadeUp>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <FadeUp key={index} duration={0.6} delay={0.1 * (index + 1)}>
                  <div className="rounded-xl border border-[#6C7A89]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2E86A7]/40 hover:shadow-lg dark:border-[#6C7A89]/10 dark:bg-zinc-800">
                    <div className="mb-3 flex justify-center text-2xl text-[#2E86A7]">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {value.description}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-14 md:px-20">
        <FadeUp duration={0.6}>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Meet the{" "}
            <span className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="mb-12 text-lg text-zinc-600 dark:text-zinc-400">
            A lean, focused team of engineers building world-class software.
          </p>
        </FadeUp>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, index) => (
            <FadeUp key={index} duration={0.6} delay={0.1 * (index + 1)}>
              <div className="group rounded-xl border border-[#6C7A89]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2E86A7]/40 hover:shadow-lg dark:border-[#6C7A89]/10 dark:bg-zinc-800">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2E86A7] to-[#1F5F75] text-2xl font-bold text-white">
                  {member.role.charAt(0)}
                </div>
                <h3 className="mb-1 text-lg font-bold text-foreground">
                  {member.role}
                </h3>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
                  {member.focus}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {member.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-zinc-50 px-6 py-20 dark:bg-zinc-900/50 sm:px-14 md:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeUp duration={0.6}>
            <h2 className="mb-12 text-3xl font-bold text-foreground md:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-transparent">
                Tech Stack
              </span>
            </h2>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((stack, index) => (
              <FadeUp key={index} duration={0.6} delay={0.08 * (index + 1)}>
                <div className="rounded-xl border border-[#6C7A89]/20 bg-white p-6 transition-all duration-300 hover:border-[#2E86A7]/30 dark:border-[#6C7A89]/10 dark:bg-zinc-800">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                    {stack.category}
                  </h3>
                  <p className="text-base text-zinc-700 dark:text-zinc-300">
                    {stack.tools}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-14 md:px-20">
        <FadeUp duration={0.6}>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Ready to Build Something{" "}
            <span className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-transparent">
              Great
            </span>
            ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Let&apos;s discuss your next project. Whether you&apos;re a startup
            with an idea or an enterprise looking to modernize — we&apos;re
            ready.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${siteMetadata.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(46,134,167,0.4)]"
            >
              Start a Conversation
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#2E86A7] px-8 py-3 text-sm font-semibold text-[#2E86A7] transition-all duration-300 hover:scale-105 hover:bg-[#2E86A7]/10"
            >
              View Our Work
            </Link>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
