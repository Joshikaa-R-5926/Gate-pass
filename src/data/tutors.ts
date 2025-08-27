export interface Tutor {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  rating: number;
  studentsCount: number;
}

export const dummyTutors: Tutor[] = [
  {
    id: "t001",
    name: "Dr. Emily White",
    email: "emily.w@example.com",
    subjects: ["Mathematics", "Physics"],
    rating: 4.8,
    studentsCount: 12,
  },
  {
    id: "t002",
    name: "Prof. David Green",
    email: "david.g@example.com",
    subjects: ["Literature", "History"],
    rating: 4.5,
    studentsCount: 8,
  },
  {
    id: "t003",
    name: "Ms. Sarah Davis",
    email: "sarah.d@example.com",
    subjects: ["Biology", "Chemistry", "Computer Science"],
    rating: 4.9,
    studentsCount: 15,
  },
];