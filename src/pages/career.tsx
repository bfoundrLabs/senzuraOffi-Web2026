import { NextSeo } from "next-seo";

import { CAREERS_DATA } from "@/data/careers";
import { siteMetadata } from "@/data/siteMetaData.mjs";
import FadeUp from "@/animation/fade-up";
import { AnimatePresence } from "framer-motion";

export default function Career() {
  return (
    <>
      <NextSeo
        title="Careers at Senzura CodeLabs | Join Our Team"
        description="Explore exciting career opportunities at Senzura CodeLabs. We're hiring talented AI/ML Engineers and Software Engineers. Join our innovative team and grow your skills."
        canonical={`${siteMetadata.siteUrl}/career`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/career`,
          title: "Careers at Senzura CodeLabs",
          description:
            "Join our team as an AI/ML Engineer or Software Engineer Intern. Work on cutting-edge projects and grow with Senzura CodeLabs.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Senzura CodeLabs - Careers",
            },
          ],
          siteName: siteMetadata.siteName,
          type: "website",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "Careers, Jobs, Internship, AI/ML Engineer, Software Engineer, Senzura CodeLabs",
          },
        ]}
      />

      <section className="mx-auto mb-40 mt-6 w-full gap-20 px-6 sm:mt-12 sm:px-14 md:px-20">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence>
            <FadeUp key="career-title" duration={0.6}>
              <h1 className="text-2xl font-semibold text-foreground md:text-4xl">
                Join Our Team
              </h1>
              <div className="my-2">
                <span className="text-sm text-muted-foreground">
                  We're looking for talented engineers to help us build the future of software
                </span>
              </div>
            </FadeUp>
          </AnimatePresence>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {CAREERS_DATA.map((job, index) => (
              <FadeUp key={job.id} duration={0.6} delay={index * 0.1}>
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent/10">
                  <div className="mb-6">
                    <div className="mb-2 flex items-center gap-3">
                      <h2 className="text-xl font-bold text-accent md:text-2xl">
                        {job.title}
                      </h2>
                      <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-base font-semibold text-foreground">
                      {job.position}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      📍 {job.location}
                    </p>
                  </div>

                  <p className="mb-6 text-sm text-foreground md:text-base">
                    {job.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="mb-3 font-semibold text-foreground">
                      Requirements:
                    </h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-accent">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-3 font-semibold text-foreground">
                      What We Offer:
                    </h3>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-accent">★</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`mailto:${siteMetadata.email}?subject=Apply%20for%20${encodeURIComponent(
                      job.title,
                    )}`}
                    className="inline-block w-full rounded-lg bg-accent px-6 py-3 text-center font-semibold text-accent-foreground transition-all duration-200 hover:bg-accent/90"
                  >
                    Apply Now
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-4xl rounded-2xl bg-accent/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Don't see a position you're interested in?
            </h2>
            <p className="mt-4 text-muted-foreground">
              We're always looking for talented individuals. Feel free to reach out and share your profile.
            </p>
            <a
              href={`mailto:${siteMetadata.email}?subject=General%20Inquiry`}
              className="mt-6 inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-all duration-200 hover:bg-accent/90"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
