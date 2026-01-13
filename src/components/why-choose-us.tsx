import FadeUp from "@/animation/fade-up";

interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: string;
}

const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    title: "Expert Team",
    description:
      "Highly skilled developers and designers with years of experience in building enterprise-level solutions",
    icon: "👥",
  },
  {
    title: "Innovative Solutions",
    description:
      "Cutting-edge technologies and methodologies to deliver future-proof applications",
    icon: "💡",
  },
  {
    title: "24/7 Support",
    description:
      "Dedicated support team available round-the-clock to ensure seamless operations",
    icon: "🛟",
  },
  {
    title: "Agile Development",
    description:
      "Flexible, iterative approach ensuring rapid delivery and continuous improvements",
    icon: "⚙️",
  },
  {
    title: "Global Reach",
    description:
      "Serving clients worldwide with localized expertise and global best practices",
    icon: "🌍",
  },
  {
    title: "Quality Assurance",
    description:
      "Rigorous testing and QA processes ensuring bug-free, high-performance applications",
    icon: "✅",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-20 sm:px-14 md:px-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl">
        <FadeUp duration={0.6}>
          <div className="mb-16">
            <h2 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-100 md:text-5xl">
              Why Choose <span className="bg-accent bg-clip-text text-transparent">Senzura CodeLabs</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We're committed to delivering excellence in every project, every day
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, index) => (
            <FadeUp key={index} duration={0.6} delay={0.1 * (index + 1)}>
              <div className="group relative rounded-lg border border-zinc-200 bg-white p-8 transition-all duration-300 hover:border-accent hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-800 dark:hover:from-zinc-800 dark:hover:to-zinc-700">
                <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
