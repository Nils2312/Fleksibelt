export interface Applicant {
  id: string;
  name: string;
  university: string;
  studyProgram: string;
  location: string;
  bio: string;
  skills: string[];
  avatar: string;
  appliedDate: string;
  portfolioLinks: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  availability: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

export const mockApplicants: { [jobId: string]: Applicant[] } = {
  "1": [
    {
      id: "a1",
      name: "Emma Johansen",
      university: "NTNU",
      studyProgram: "Computer Science",
      location: "Trondheim",
      bio: "Third-year CS student passionate about frontend development and UI/UX design. Love creating beautiful, accessible web experiences.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Figma", "HTML/CSS"],
      avatar: "EJ",
      appliedDate: "2025-10-22",
      portfolioLinks: {
        github: "https://github.com/emmaj",
        linkedin: "https://linkedin.com/in/emmajohansen",
        website: "https://emmaj.dev",
      },
      availability: "Monday, Wednesday, Friday",
      status: "pending",
    },
    {
      id: "a2",
      name: "Lars Nielsen",
      university: "UiO",
      studyProgram: "Informatics",
      location: "Oslo",
      bio: "Full-stack developer with 2 years of freelance experience. Quick learner and team player. Currently looking for part-time opportunities.",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
      avatar: "LN",
      appliedDate: "2025-10-21",
      portfolioLinks: {
        github: "https://github.com/larsn",
        linkedin: "https://linkedin.com/in/larsnielsen",
      },
      availability: "Monday, Tuesday, Thursday, Friday",
      status: "reviewed",
    },
    {
      id: "a3",
      name: "Sofia Andersen",
      university: "NTNU",
      studyProgram: "Software Engineering",
      location: "Trondheim",
      bio: "Passionate about creating responsive and performant web applications. Strong focus on clean code and best practices.",
      skills: ["React", "TypeScript", "Redux", "Jest", "Git"],
      avatar: "SA",
      appliedDate: "2025-10-23",
      portfolioLinks: {
        github: "https://github.com/sofiaa",
        linkedin: "https://linkedin.com/in/sofiaandersen",
      },
      availability: "Tuesday, Thursday",
      status: "pending",
    },
    {
      id: "a4",
      name: "Magnus Berg",
      university: "UiB",
      studyProgram: "Computer Science",
      location: "Bergen / Remote",
      bio: "React developer with a keen eye for design. Previously built 3 successful web applications for local startups.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
      avatar: "MB",
      appliedDate: "2025-10-20",
      portfolioLinks: {
        github: "https://github.com/magnusb",
        website: "https://magnusberg.no",
      },
      availability: "Monday, Wednesday, Friday, Saturday",
      status: "reviewed",
    },
    {
      id: "a5",
      name: "Ingrid Solberg",
      university: "NTNU",
      studyProgram: "Computer Science",
      location: "Trondheim",
      bio: "Frontend enthusiast with a background in design. Love bridging the gap between design and development.",
      skills: ["React", "JavaScript", "CSS", "Figma", "Adobe XD"],
      avatar: "IS",
      appliedDate: "2025-10-24",
      portfolioLinks: {
        github: "https://github.com/ingrids",
        linkedin: "https://linkedin.com/in/ingridsolberg",
        website: "https://ingrid.design",
      },
      availability: "Wednesday, Thursday, Friday",
      status: "pending",
    },
  ],
  "2": [
    {
      id: "a6",
      name: "Henrik Dahl",
      university: "UiO",
      studyProgram: "Computer Science",
      location: "Oslo",
      bio: "Backend specialist with experience in Node.js and database optimization. Love solving complex technical challenges.",
      skills: ["Node.js", "PostgreSQL", "Express", "REST API", "Docker"],
      avatar: "HD",
      appliedDate: "2025-10-19",
      portfolioLinks: {
        github: "https://github.com/henrikd",
        linkedin: "https://linkedin.com/in/henrikdahl",
      },
      availability: "Monday, Tuesday, Wednesday, Thursday, Friday",
      status: "pending",
    },
  ],
};
