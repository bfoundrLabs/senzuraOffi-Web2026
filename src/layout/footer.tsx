import ContactButton from "@/components/contact-form/contact-button";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";
import { PhoneIcon } from "lucide-react";
import { siteMetadata } from "@/data/siteMetaData.mjs";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-20 bg-transparent px-6 py-8 sm:px-14 md:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 rounded-2xl bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] p-8 text-white sm:p-12 md:gap-12 lg:p-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase text-[#2E86A7] md:text-sm lg:text-base">
            Get in touch
          </span>
        </div>
        <a
          href={`mailto:${siteMetadata.email}`}
          target="_blank"
          className="mb-6 cursor-pointer text-center text-2xl font-bold underline sm:text-4xl lg:text-6xl"
        >
          {siteMetadata.email}
        </a>

        <div className="flex justify-center">
          <ContactButton />
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between lg:mx-auto lg:max-w-7xl">
        <span className="mb-1 text-foreground md:mb-0">
          &copy; 2026 {siteMetadata.siteName}. All rights reserved.
        </span>

        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
          <div className="flex items-center gap-4">
            <a
              href={siteMetadata.facebook}
              target="_blank"
              className="h-6 w-6"
              aria-label="link to Facebook"
            >
              <FacebookIcon className="text-accent transition-colors duration-150 hover:text-accent-foreground" />
            </a>
            <a
              href={siteMetadata.instagram}
              target="_blank"
              className="h-6 w-6"
              aria-label="link to Instagram"
            >
              <InstagramIcon className="text-accent transition-colors duration-150 hover:text-accent-foreground" />
            </a>
            <a
              href={siteMetadata.linkedin}
              target="_blank"
              className="h-6 w-6"
              aria-label="link to Linkedin"
            >
              <LinkedinIcon className="text-accent transition-colors duration-150 hover:text-accent-foreground" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${siteMetadata.email}`}
              className="flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-150 hover:text-accent-foreground"
              aria-label="Email us"
            >
              <MailIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{siteMetadata.email}</span>
            </a>
            <a
              href="tel:+94704551111"
              className="flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-150 hover:text-accent-foreground"
              aria-label="Call us"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>+94 70 455 1111</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
