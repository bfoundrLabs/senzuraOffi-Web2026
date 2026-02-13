import { useState } from "react";
import { NextSeo } from "next-seo";
import { AnimatePresence } from "framer-motion";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Loader2Icon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import FadeUp from "@/animation/fade-up";
import { siteMetadata } from "@/data/siteMetaData.mjs";
import CustomInput from "@/components/utility/custom-input";
import CustomTextarea from "@/components/utility/custom-textarea";
import { type FormiKInputFieldProps } from "@/utility/types";

const contactValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

type ContactFormValues = Yup.InferType<typeof contactValidationSchema>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const FAQ_DATA = [
  {
    q: "What technologies do you use?",
    a: "We work with modern stacks including Next.js, React, Node.js, MongoDB, Flutter, and cloud platforms like AWS and GCP.",
  },
  {
    q: "Do you build secure systems?",
    a: "Security-first architecture is our core principle. We implement encryption, secure authentication, and follow OWASP best practices.",
  },
  {
    q: "Can you scale startup products?",
    a: "Yes. We design systems ready for growth from day one with microservices, load balancing, and cloud-native architecture.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Depending on scope, most projects take 4–12 weeks from kickoff to launch. We work in agile sprints with weekly demos and feedback cycles.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Absolutely. We provide maintenance, monitoring, and feature development packages to keep your product running smoothly post-launch.",
  },
  {
    q: "How do we get started?",
    a: "Simply fill out the contact form above or email us directly. We'll schedule a free discovery call to understand your requirements and propose a tailored solution.",
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSubmitStatus("success");
        resetForm();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NextSeo
        title="Contact Senzura Codelabs | Get In Touch"
        description="Have a project in mind? Contact Senzura Codelabs for secure, scalable software development, cloud solutions, and more."
        canonical={`${siteMetadata.siteUrl}/contact`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/contact`,
          title: "Contact Senzura Codelabs",
          description:
            "Reach out to discuss your next project. We build secure, scalable digital solutions for startups and enterprises.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Senzura Codelabs - Contact Us",
            },
          ],
          siteName: siteMetadata.siteName,
          type: "website",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "contact, Senzura Codelabs, software development, get in touch, hire developers",
          },
        ]}
      />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-20 sm:px-14 md:px-20">
        <AnimatePresence>
          <FadeUp key="contact-hero" duration={0.6}>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Contact Us
            </span>
            <h1 className="mt-3 bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
              Let&apos;s Build Something Great
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Have a project in mind? We&apos;d love to hear about it. Fill out
              the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </FadeUp>
        </AnimatePresence>
      </section>

      {/* Contact Form + Info */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-14 md:px-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <FadeUp duration={0.6} delay={0.1}>
              <div className="rounded-2xl border border-[#6C7A89]/20 bg-white p-8 shadow-sm dark:border-[#6C7A89]/10 dark:bg-zinc-900 md:p-10">
                <Formik
                  initialValues={initialValues}
                  validationSchema={contactValidationSchema}
                  onSubmit={handleSubmit}
                  validateOnChange
                >
                  <Form className="flex flex-col gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="name"
                        className="text-sm font-semibold text-foreground"
                      >
                        Name
                      </label>
                      <Field name="name">
                        {({ field, meta }: FormiKInputFieldProps<string>) => (
                          <div className="relative">
                            <CustomInput
                              id="name"
                              {...field}
                              type="text"
                              placeholder="Your full name"
                              autoComplete="off"
                            />
                            {Boolean(meta.touched && meta.error) && (
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-foreground"
                      >
                        Email
                      </label>
                      <Field name="email">
                        {({ field, meta }: FormiKInputFieldProps<string>) => (
                          <div className="relative">
                            <CustomInput
                              id="email"
                              {...field}
                              type="text"
                              placeholder="you@company.com"
                              autoComplete="off"
                            />
                            {Boolean(meta.touched && meta.error) && (
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="subject"
                        className="text-sm font-semibold text-foreground"
                      >
                        Subject
                      </label>
                      <Field name="subject">
                        {({ field, meta }: FormiKInputFieldProps<string>) => (
                          <div className="relative">
                            <CustomInput
                              id="subject"
                              {...field}
                              type="text"
                              placeholder="Project inquiry, partnership, etc."
                              autoComplete="off"
                            />
                            {Boolean(meta.touched && meta.error) && (
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="message"
                        className="text-sm font-semibold text-foreground"
                      >
                        Message
                      </label>
                      <Field name="message">
                        {({ field, meta }: FormiKInputFieldProps<string>) => (
                          <div className="relative">
                            <CustomTextarea
                              id="message"
                              {...field}
                              placeholder="Tell us about your project..."
                            />
                            {Boolean(meta.touched && meta.error) && (
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-full rounded-full bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] px-6 py-3 text-center text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(46,134,167,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2Icon className="animate-spin" size={16} />
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>

                    {submitStatus === "success" && (
                      <div className="mt-2 rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        Message sent successfully! We&apos;ll get back to you
                        soon.
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="mt-2 rounded-lg bg-red-50 p-4 text-center text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
                        Something went wrong. Please try again or email us
                        directly.
                      </div>
                    )}
                  </Form>
                </Formik>
              </div>
            </FadeUp>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-2">
            <FadeUp duration={0.6} delay={0.2}>
              <div className="space-y-6">
                <div className="rounded-2xl border border-[#6C7A89]/20 bg-white p-8 shadow-sm dark:border-[#6C7A89]/10 dark:bg-zinc-900">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2E86A7] to-[#1F5F75]">
                      <MailIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Email Us
                      </h3>
                      <a
                        href={`mailto:${siteMetadata.email}`}
                        className="text-sm text-accent hover:underline"
                      >
                        {siteMetadata.email}
                      </a>
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2E86A7] to-[#1F5F75]">
                      <MapPinIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Location
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Colombo, Sri Lanka
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2E86A7] to-[#1F5F75]">
                      <PhoneIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Working Hours
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Mon – Fri, 9 AM – 6 PM IST
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#2E86A7]/20 bg-gradient-to-br from-[#2E86A7]/5 to-[#1F5F75]/5 p-8">
                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    Why Work With Us?
                  </h3>
                  <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-accent">✓</span>
                      Free initial consultation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-accent">✓</span>
                      24-hour response guarantee
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-accent">✓</span>
                      Security-first engineering
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-accent">✓</span>
                      Transparent pricing & timelines
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-accent">✓</span>
                      Post-launch support included
                    </li>
                  </ul>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-zinc-50 px-6 py-20 dark:bg-zinc-900/50 sm:px-14 md:px-20">
        <div className="mx-auto max-w-4xl">
          <FadeUp duration={0.6}>
            <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="mb-12 text-center text-lg text-zinc-600 dark:text-zinc-400">
              Everything you need to know before starting a project with us.
            </p>
          </FadeUp>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <FadeUp key={index} duration={0.6} delay={0.08 * (index + 1)}>
                <div className="rounded-xl border border-[#6C7A89]/20 bg-white p-6 transition-all duration-300 hover:border-[#2E86A7]/30 hover:shadow-md dark:border-[#6C7A89]/10 dark:bg-zinc-800">
                  <h4 className="mb-2 text-base font-semibold text-foreground">
                    {faq.q}
                  </h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
