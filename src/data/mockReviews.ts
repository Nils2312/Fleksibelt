export interface Review {
  id: string;
  reviewerName: string;
  reviewerRole: "student" | "employer";
  rating: number;
  comment: string;
  date: string;
  jobTitle?: string;
  companyName?: string;
  studentName?: string;
}

// Reviews written by students about companies
export const companyReviews: Review[] = [
  {
    id: "r1",
    reviewerName: "Emma Johansen",
    reviewerRole: "student",
    rating: 5,
    comment: "Great experience working with TechStart! The team was very supportive and I learned a lot about React and modern web development. Would definitely work with them again.",
    date: "2025-10-15",
    jobTitle: "Frontend Developer",
    companyName: "TechStart AS",
  },
  {
    id: "r2",
    reviewerName: "Lars Nielsen",
    reviewerRole: "student",
    rating: 5,
    comment: "Amazing company culture and clear project requirements. They were flexible with my exam schedule and paid on time. Highly recommended!",
    date: "2025-10-10",
    jobTitle: "Full Stack Developer",
    companyName: "Nordic Innovate",
  },
  {
    id: "r3",
    reviewerName: "Sofia Andersen",
    reviewerRole: "student",
    rating: 5,
    comment: "Professional team and interesting projects. Got to work with cutting-edge technologies and the mentorship was excellent. Perfect for students!",
    date: "2025-09-28",
    jobTitle: "Backend Developer",
    companyName: "DataFlow Solutions",
  },
  {
    id: "r4",
    reviewerName: "Magnus Berg",
    reviewerRole: "student",
    rating: 4,
    comment: "Good project and fair compensation. Communication could have been better at times, but overall a positive experience.",
    date: "2025-09-20",
    jobTitle: "Mobile Developer",
    companyName: "AppWorks",
  },
];

// Reviews written by employers about students
export const studentReviews: Review[] = [
  {
    id: "r5",
    reviewerName: "Anna Larsen",
    reviewerRole: "employer",
    rating: 5,
    comment: "Excellent developer! Delivered high-quality code ahead of schedule. Very professional and easy to work with.",
    date: "2025-10-15",
    companyName: "TechStart AS",
    studentName: "John Doe",
  },
  {
    id: "r6",
    reviewerName: "Erik Hansen",
    reviewerRole: "employer",
    rating: 5,
    comment: "Great communication and problem-solving skills. Took initiative and delivered beyond expectations.",
    date: "2025-10-05",
    companyName: "DataFlow Solutions",
    studentName: "John Doe",
  },
];
