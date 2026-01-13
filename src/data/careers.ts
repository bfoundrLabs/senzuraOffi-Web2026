export type Career = {
  id: number;
  title: string;
  position: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
};

export const CAREERS_DATA: Career[] = [
  {
    id: 1,
    title: "AI/ML Engineer Intern",
    position: "Intern - Artificial Intelligence & Machine Learning",
    type: "Internship",
    location: "Remote",
    description:
      "Join our AI/ML team to develop and optimize machine learning models for real-world applications. Work on data processing, model training, and deployment while mentored by senior engineers.",
    requirements: [
      "Strong foundation in Python programming",
      "Understanding of ML algorithms and deep learning concepts",
      "Experience with TensorFlow, PyTorch, or scikit-learn",
      "Knowledge of data preprocessing and feature engineering",
      "Problem-solving mindset and enthusiasm to learn",
    ],
    benefits: [
      "Hands-on experience with cutting-edge AI/ML technologies",
      "Mentorship from experienced ML engineers",
      "Flexible working hours",
      "Remote work opportunity",
      "Competitive internship stipend",
      "Opportunity for full-time conversion",
    ],
  },
  {
    id: 2,
    title: "Software Engineer Intern",
    position: "Intern - Full Stack Web Development",
    type: "Internship",
    location: "Remote",
    description:
      "Develop and maintain web applications using modern technologies. Collaborate with our engineering team to build scalable, user-friendly solutions while learning industry best practices.",
    requirements: [
      "Proficiency in JavaScript/TypeScript",
      "Experience with React, Next.js, or similar frameworks",
      "Understanding of REST APIs and backend fundamentals",
      "Knowledge of version control (Git)",
      "Ability to work in a collaborative team environment",
      "Strong communication skills",
    ],
    benefits: [
      "Experience with modern web development stack",
      "Mentorship and code review from senior developers",
      "Flexible working schedule",
      "Remote position with flexibility",
      "Competitive internship compensation",
      "Path to permanent position",
    ],
  },
];
