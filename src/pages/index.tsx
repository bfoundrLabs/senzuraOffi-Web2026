import Head from "next/head";

import { NextSeo } from "next-seo";

import LandingHero from "@/components/landing-hero";
import SkillsCarousel from "@/components/skills-carousel";
import ServicesShowcase from "@/components/services/services-showcase";
import WhyChooseUs from "@/components/why-choose-us";
import ProjectShowcase from "@/components/projects/project-showcase";
import { PROJECT_SHOWCASE } from "@/data/projects";
import { SERVICES_DATA } from "@/data/services";
import { siteMetadata } from "@/data/siteMetaData.mjs";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Senzura Codelabs — Engineering Secure Digital Futures"
        description="Senzura Codelabs builds secure, scalable, and high-performance digital solutions for startups and enterprises. Web development, mobile apps, cloud & DevOps."
        canonical={siteMetadata.siteUrl}
        openGraph={{
          url: siteMetadata.siteUrl,
          title: "Senzura Codelabs — Engineering Secure Digital Futures",
          description:
            "Modern software engineering company building secure, scalable digital platforms. Full-stack web, mobile, cloud, and distributed system solutions.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Senzura Codelabs - Software Engineering Company",
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
              "software development, web development, mobile apps, cloud solutions, Next.js, React, Node.js, MongoDB, secure systems, startup engineering, Senzura Codelabs",
          },
        ]}
      />
      <Head>
        {siteMetadata.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={siteMetadata.googleSiteVerification}
          />
        )}
      </Head>
      <LandingHero />
      <SkillsCarousel />
      <ServicesShowcase services={SERVICES_DATA} />
      <WhyChooseUs />
      <ProjectShowcase projects={PROJECT_SHOWCASE} />
    </>
  );
}
