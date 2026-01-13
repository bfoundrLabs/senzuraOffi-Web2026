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
        title="Senzura CodeLabs — Professional Software Development & Digital Solutions"
        description="Senzura CodeLabs delivers innovative web development, mobile applications, custom software, AI solutions, and digital transformation services. Empowering businesses worldwide with cutting-edge technology."
        canonical={siteMetadata.siteUrl}
        openGraph={{
          url: siteMetadata.siteUrl,
          title: "Senzura CodeLabs — Building Professional & High-Converting Software",
          description:
            "Leading software development company specializing in web applications, mobile apps, cloud solutions, and AI integration. We help businesses grow online with scalable, user-centric technology.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Senzura CodeLabs - Software Development Company",
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
              "React Developer, Software Developer, Frontend Developer, Web Developer, JavaScript, HTML, CSS, Portfolio, UI/UX, React.js, Frontend Development, Web Development, JavaScript Developer, Responsive Design",
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
