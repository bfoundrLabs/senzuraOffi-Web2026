import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import ProjectCard from "@/components/projects/project-card";
import { siteMetadata } from "@/data/siteMetaData.mjs";

interface ProjectData {
  _id: string;
  name: string;
  favicon: string;
  images: string[];
  description: string;
  sourceCodeHref: string;
  liveWebsiteHref: string;
  tags: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <NextSeo
        title="Senzura CodeLabs — Case Studies & Projects"
        description="Explore Senzura CodeLabs' case studies and projects showcasing web, cloud and software solutions built for real customers."
        canonical={`${siteMetadata.siteUrl}/projects`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/projects`,
          title: "Senzura CodeLabs — Projects & Case Studies",
          description:
            "Projects and case studies from Senzura CodeLabs demonstrating our engineering approach, architecture, and delivered outcomes.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Senzura CodeLabs - Projects",
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
              "Senzura CodeLabs, projects, case studies, web development, cloud engineering, software engineering",
          },
        ]}
      />
      <section className="mx-auto mb-40 mt-6 w-full gap-20 px-6 sm:mt-12 sm:px-14 md:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-semibold text-foreground md:text-4xl">
            Projects
          </h1>
          <div className="my-2">
            <span className="text-sm text-muted-foreground">
              Showcasing our proven track record of delivering exceptional
              digital solutions
            </span>
          </div>

          {loading ? (
            <div className="mt-16 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2E86A7] border-t-transparent" />
            </div>
          ) : projects.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="text-lg text-muted-foreground">
                Projects coming soon. Stay tuned!
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  name={project.name}
                  favicon={project.favicon}
                  imageUrl={project.images}
                  description={project.description}
                  sourceCodeHref={project.sourceCodeHref}
                  liveWebsiteHref={project.liveWebsiteHref}
                />
              ))}
            </div>
          )}

          <div className="mx-auto mt-16 max-w-5xl text-center text-foreground md:mt-28">
            <span className="text-xl font-bold md:text-2xl">
              Empowering businesses worldwide with innovative software
              solutions, cutting-edge technology, and proven expertise.
            </span>
            <p className="mt-10 text-base md:text-xl">
              Ready to transform your business?{" "}
              <a
                href={`mailto:${siteMetadata.email}`}
                className="font-semibold text-accent underline underline-offset-2 hover:text-accent/70"
              >
                Get in touch
              </a>{" "}
              to discuss your project.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
