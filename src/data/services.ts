export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const SERVICES_DATA: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Modern, responsive web applications built with cutting-edge technologies for optimal performance and user experience.",
    icon: "🌐",
    features: [
      "React & Next.js development",
      "Responsive design",
      "SEO optimization",
      "Performance tuning",
      "Progressive Web Apps",
    ],
  },
  {
    id: 2,
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile solutions that deliver seamless experiences on iOS and Android devices.",
    icon: "📱",
    features: [
      "iOS & Android development",
      "Cross-platform solutions",
      "UI/UX optimization",
      "App store deployment",
      "Real-time features",
    ],
  },
  {
    id: 3,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and deployment services to ensure reliability, security, and performance.",
    icon: "☁️",
    features: [
      "AWS & Azure integration",
      "Serverless architecture",
      "Database optimization",
      "CDN configuration",
      "Disaster recovery",
    ],
  },
  {
    id: 4,
    title: "AI & Machine Learning",
    description:
      "Intelligent automation and predictive analytics powered by advanced AI and machine learning models.",
    icon: "🤖",
    features: [
      "ML model development",
      "Data analysis & insights",
      "Natural Language Processing",
      "Computer Vision",
      "Predictive analytics",
    ],
  },
  {
    id: 5,
    title: "Custom Software Development",
    description:
      "Tailored solutions designed specifically for your business needs and technical requirements.",
    icon: "⚙️",
    features: [
      "Requirements analysis",
      "Architecture design",
      "Full-stack development",
      "Quality assurance",
      "Ongoing support",
    ],
  },
  {
    id: 6,
    title: "Digital Transformation",
    description:
      "End-to-end digital modernization services to streamline operations and enhance digital presence.",
    icon: "🚀",
    features: [
      "Legacy system migration",
      "Process automation",
      "Digital strategy",
      "Technology consulting",
      "Change management",
    ],
  },
];
