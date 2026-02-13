import React, { useEffect, useState, useRef } from "react";
import { NextSeo } from "next-seo";
import { AnimatePresence } from "framer-motion";
import { Loader2Icon, XIcon, UploadIcon, FileTextIcon } from "lucide-react";

import FadeUp from "@/animation/fade-up";
import { siteMetadata } from "@/data/siteMetaData.mjs";

interface CareerItem {
  _id: string;
  title: string;
  position: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export default function Career() {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingTo, setApplyingTo] = useState<CareerItem | null>(null);
  const [applying, setApplying] = useState(false);
  const [applyStatus, setApplyStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [applyError, setApplyError] = useState("");
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvUrl, setCvUrl] = useState("");
  const [cvFileName, setCvFileName] = useState("");
  const cvFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/careers")
      .then((r) => r.json())
      .then((data) => {
        setCareers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingTo) return;
    setApplying(true);
    setApplyStatus("idle");

    try {
      let resumeUrl = cvUrl;

      // Upload CV if a file is selected and not yet uploaded
      if (cvFile && !cvUrl) {
        setCvUploading(true);
        const reader = new FileReader();
        const fileDataUrl = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(cvFile);
        });

        const uploadRes = await fetch("/api/upload-cv", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: fileDataUrl, fileName: cvFile.name }),
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          resumeUrl = uploadData.url;
          setCvUrl(uploadData.url);
          const original =
            uploadData.originalFilename || uploadData.original_filename || "";
          const format = uploadData.format || "";
          const filename = original
            ? format
              ? `${original}.${format}`
              : original
            : cvFile.name;
          setCvFileName(filename);
        } else {
          const err = await uploadRes
            .json()
            .catch(() => ({ message: "Upload failed" }));
          setApplyError(err.message || "Upload failed");
          setApplyStatus("error");
          setCvUploading(false);
          setApplying(false);
          return;
        }
        setCvUploading(false);
      }

      const res = await fetch("/api/career-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerTitle: applyingTo.title,
          ...applyForm,
          resumeUrl,
          resumeFileName: cvFileName || undefined,
        }),
      });

      if (res.ok) {
        setApplyStatus("success");
        setApplyForm({ name: "", email: "", phone: "", coverLetter: "" });
        setCvFile(null);
        setCvUrl("");
        setCvFileName("");
        setApplyError("");
      } else {
        const err = await res
          .json()
          .catch(() => ({ message: "Submission failed" }));
        setApplyError(err.message || "Submission failed");
        setApplyStatus("error");
      }
    } catch {
      setApplyError("Unexpected error submitting application");
      setApplyStatus("error");
    }
    setApplying(false);
  };

  return (
    <>
      <NextSeo
        title="Careers at Senzura CodeLabs | Join Our Team"
        description="Explore exciting career opportunities at Senzura CodeLabs. Join our innovative team and grow your skills."
        canonical={`${siteMetadata.siteUrl}/career`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/career`,
          title: "Careers at Senzura CodeLabs",
          description:
            "Join our team and work on cutting-edge projects. Grow with Senzura CodeLabs.",
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
              "Careers, Jobs, Internship, Senzura CodeLabs, Software Engineer",
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
                  We&apos;re looking for talented engineers to help us build the
                  future of software
                </span>
              </div>
            </FadeUp>
          </AnimatePresence>

          {loading ? (
            <div className="mt-20 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            </div>
          ) : careers.length === 0 ? (
            <FadeUp duration={0.6} delay={0.2}>
              <div className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-12 text-center">
                <h2 className="text-2xl font-bold text-foreground">
                  No Open Positions Right Now
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We&apos;re always looking for talented individuals. Feel free
                  to reach out and share your profile.
                </p>
                <a
                  href={`mailto:careers@senzura.tech?subject=Career%20Inquiry`}
                  className="mt-6 inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-all duration-200 hover:bg-accent/90"
                >
                  Get in Touch
                </a>
              </div>
            </FadeUp>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {careers.map((job, index) => (
                <FadeUp key={job._id} duration={0.6} delay={index * 0.1}>
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

                    {job.requirements.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-3 font-semibold text-foreground">
                          Requirements:
                        </h3>
                        <ul className="space-y-2">
                          {job.requirements.map((req, i) => (
                            <li
                              key={i}
                              className="flex gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-accent">✓</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {job.benefits.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-3 font-semibold text-foreground">
                          What We Offer:
                        </h3>
                        <ul className="space-y-2">
                          {job.benefits.map((benefit, i) => (
                            <li
                              key={i}
                              className="flex gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-accent">★</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setApplyingTo(job);
                        setApplyStatus("idle");
                      }}
                      className="inline-block w-full rounded-lg bg-accent px-6 py-3 text-center font-semibold text-accent-foreground transition-all duration-200 hover:bg-accent/90"
                    >
                      Apply Now
                    </button>
                  </div>
                </FadeUp>
              ))}
            </div>
          )}

          <div className="mx-auto mt-20 max-w-4xl rounded-2xl bg-accent/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Don&apos;t see a position you&apos;re interested in?
            </h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;re always looking for talented individuals. Feel free to
              reach out and share your profile.
            </p>
            <a
              href={`mailto:careers@senzura.tech?subject=Career%20Inquiry`}
              className="mt-6 inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-all duration-200 hover:bg-accent/90"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {applyingTo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <button
              onClick={() => setApplyingTo(null)}
              className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <XIcon size={20} />
            </button>

            <h3 className="mb-1 text-xl font-bold text-foreground">
              Apply for {applyingTo.title}
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              {applyingTo.position}
            </p>

            {applyStatus === "success" ? (
              <div className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
                <h4 className="text-lg font-semibold text-green-700 dark:text-green-400">
                  Application Submitted!
                </h4>
                <p className="mt-2 text-sm text-green-600 dark:text-green-300">
                  Thank you for applying. We&apos;ll review your application and
                  get back to you soon.
                </p>
                <button
                  onClick={() => setApplyingTo(null)}
                  className="mt-4 rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex flex-col gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={applyForm.name}
                    onChange={(e) =>
                      setApplyForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={applyForm.email}
                    onChange={(e) =>
                      setApplyForm((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={applyForm.phone}
                    onChange={(e) =>
                      setApplyForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Cover Letter
                  </label>
                  <textarea
                    value={applyForm.coverLetter}
                    onChange={(e) =>
                      setApplyForm((p) => ({
                        ...p,
                        coverLetter: e.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="Tell us why you'd be a great fit..."
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Resume / CV (PDF, DOC, DOCX)
                  </label>
                  <input
                    ref={cvFileRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          alert("File must be less than 5MB");
                          return;
                        }
                        setCvFile(file);
                        setCvUrl("");
                      }
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => cvFileRef.current?.click()}
                    className="flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-sm transition-colors hover:border-[#2E86A7]/50 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-[#2E86A7]/50 dark:hover:bg-zinc-700"
                  >
                    {cvFile ? (
                      <>
                        <FileTextIcon size={18} className="text-[#2E86A7]" />
                        <span className="flex-1 truncate text-left text-zinc-700 dark:text-zinc-300">
                          {cvFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCvFile(null);
                            setCvUrl("");
                            if (cvFileRef.current) cvFileRef.current.value = "";
                          }}
                          className="rounded p-0.5 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-600"
                        >
                          <XIcon size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <UploadIcon size={18} className="text-zinc-400" />
                        <span className="text-zinc-500">
                          Click to upload your CV
                        </span>
                      </>
                    )}
                  </button>
                  <p className="mt-1 text-xs text-zinc-400">
                    Max 5MB. PDF, DOC, or DOCX format.
                  </p>
                </div>

                {applyStatus === "error" && (
                  <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {applyError || "Something went wrong. Please try again."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={applying}
                  className="w-full rounded-lg bg-gradient-to-r from-[#2E86A7] to-[#1F5F75] py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:opacity-60"
                >
                  {applying ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2Icon className="animate-spin" size={16} />
                      {cvUploading ? "Uploading CV..." : "Submitting..."}
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
