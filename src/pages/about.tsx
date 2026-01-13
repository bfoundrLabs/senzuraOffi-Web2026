import { NextSeo } from "next-seo";

import AboutHero from "@/components/about-hero";
import ExperienceShowcaseList from "@/components/experience/experience-showcase-list";
import { EXPERIENCE } from "@/data/experience";
import { EDUCATION } from "@/data/education";
import { siteMetadata } from "@/data/siteMetaData.mjs";

export default function About() {
  return (
    <>
      <NextSeo
        title="About Senzura CodeLabs | Leading Software Development Company"
        description="Learn about Senzura CodeLabs - a professional software development company delivering web design, mobile applications, custom software, and digital transformation solutions to businesses worldwide."
        canonical={`${siteMetadata.siteUrl}/about`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/about`,
          title: "About Senzura CodeLabs — Our Mission & Expertise",
          description:
            "Discover Senzura CodeLabs' team, expertise in web and mobile development, and our commitment to delivering innovative, scalable software solutions that drive business success.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Senzura CodeLabs - About Our Company",
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
              "Software Developer portfolio, Software Developer, React Developer, Frontend Developer, Web Developer, JavaScript, HTML, CSS, Professional Journey, Skills, Passion for Web Development",
          },
        ]}
      />
      <AboutHero />
      <ExperienceShowcaseList title="Experience" details={EXPERIENCE} />
      <ExperienceShowcaseList title="Education" details={EDUCATION} />
    </>
  );
}
