import React from "react";
import {
  GlobeIcon,
  MobileIcon,
  CloudIcon,
  GearIcon,
  PaintIcon,
  BuildIcon,
} from "@/components/icons";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

export const SERVICES_DATA: Service[] = [
  {
    id: 1,
    title: "Custom Web Application Development",
    description:
      "High-performance, responsive web applications built with modern frameworks for seamless user experiences and business growth.",
    icon: GlobeIcon,
    features: [
      "Next.js & React development",
      "Server-side rendering & static generation",
      "Progressive Web Apps (PWA)",
      "SEO & performance optimization",
      "Responsive & accessible design",
    ],
  },
  {
    id: 2,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications with native-quality performance, built using Flutter and React Native.",
    icon: MobileIcon,
    features: [
      "Flutter & React Native development",
      "iOS & Android deployment",
      "Push notifications & real-time sync",
      "Offline-first architecture",
      "App store optimization",
    ],
  },
  {
    id: 3,
    title: "Cloud & DevOps Solutions",
    description:
      "Scalable cloud infrastructure with automated CI/CD pipelines, containerization, and monitoring for reliable deployments.",
    icon: CloudIcon,
    features: [
      "AWS, Azure & GCP integration",
      "Docker & Kubernetes orchestration",
      "CI/CD pipeline automation",
      "Infrastructure as Code (IaC)",
      "Monitoring & incident response",
    ],
  },
  {
    id: 4,
    title: "API & Backend Engineering",
    description:
      "Robust, secure backend systems and RESTful/GraphQL APIs designed for high throughput and low latency.",
    icon: GearIcon,
    features: [
      "Node.js & Express backends",
      "RESTful & GraphQL API design",
      "Authentication & authorization",
      "Database design & optimization",
      "Microservices architecture",
    ],
  },
  {
    id: 5,
    title: "UI/UX Engineering",
    description:
      "Pixel-perfect interfaces with intuitive user flows, design systems, and accessibility-first development.",
    icon: PaintIcon,
    features: [
      "Design system creation",
      "Figma to code conversion",
      "Interaction & motion design",
      "Accessibility (WCAG) compliance",
      "User research & testing",
    ],
  },
  {
    id: 6,
    title: "System Architecture & Consulting",
    description:
      "Strategic technology consulting and architecture design to ensure your systems are future-ready and scalable.",
    icon: BuildIcon,
    features: [
      "Architecture review & design",
      "Technology stack selection",
      "Scalability planning",
      "Security-first design patterns",
      "Technical due diligence",
    ],
  },
];
