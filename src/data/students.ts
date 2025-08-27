export interface Student {
  id: string;
  name: string;
  email: string;
  grade: number;
  courses: string[];
  lastLogin: string;
}

export const dummyStudents: Student[] = [
  {
    id: "s001",
    name: "Alice Smith",
    email: "alice.s@example.com",
    grade: 10,
    courses: ["Mathematics", "Physics", "Chemistry"],
    lastLogin: "2024-07-29T10:30:00Z",
  },
  {
    id: "s002",
    name: "Bob Johnson",
    email: "bob.j@example.com",
    grade: 11,
    courses: ["Literature", "History", "Art"],
    lastLogin: "2024-07-28T14:15:00Z",
  },
  {
    id: "s003",
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    grade: 9,
    courses: ["Biology", "Computer Science"],
    lastLogin: "2024-07-29T09:00:00Z",
  },
];