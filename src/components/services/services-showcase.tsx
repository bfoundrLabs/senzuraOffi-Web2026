import FadeUp from "@/animation/fade-up";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface ServicesShowcaseProps {
  services: Service[];
}

export default function ServicesShowcase({ services }: ServicesShowcaseProps) {
  return (
    <section id="services" className="relative w-full overflow-hidden px-6 py-20 sm:px-14 md:px-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp duration={0.6}>
          <div className="mb-16">
            <h2 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-100 md:text-5xl">
              Our <span className="bg-accent bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Comprehensive software solutions tailored to transform your business and drive growth
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeUp key={service.id} duration={0.6} delay={0.1 * (index + 1)}>
              <div className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-8 transition-all duration-300 hover:border-accent hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800 dark:hover:from-zinc-800 dark:hover:to-zinc-700">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {service.title}
                  </h3>

                  <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase text-accent">
                      Key Features:
                    </p>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm text-zinc-700 dark:text-zinc-300"
                        >
                          <span className="mr-2 mt-1 flex-shrink-0 text-accent">
                            •
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
