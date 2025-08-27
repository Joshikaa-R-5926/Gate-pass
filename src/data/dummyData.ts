export interface Student {
  id: string;
  name: string;
  email: string;
  courses: { id: string; name: string; grade: string }[];
  upcomingAssignments: { id: string; title: string; dueDate: string; course: string }[];
}

export interface Tutor {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  students: { id: string; name: string }[];
  schedule: { id: string; date: string; time: string; studentName: string; subject: string }[];
}

export const dummyStudents: Student[] = [
  {
    id: "s1",
    name: "Alice Smith",
    email: "alice.s@example.com",
    courses: [
      { id: "c101", name: "Mathematics I", grade: "A" },
      { id: "c102", name: "Physics Basics", grade: "B+" },
    ],
    upcomingAssignments: [
      { id: "a001", title: "Math Homework 3", dueDate: "2024-10-15", course: "Mathematics I" },
      { id: "a002", title: "Physics Lab Report", dueDate: "2024-10-20", course: "Physics Basics" },
    ],
  },
  {
    id: "s2",
    name: "Bob Johnson",
    email: "bob.j@example.com",
    courses: [
      { id: "c103", name: "Chemistry Fundamentals", grade: "A-" },
      { id: "c104", name: "English Literature", grade: "B" },
    ],
    upcomingAssignments: [
      { id: "a003", title: "Chemistry Quiz", dueDate: "2024-10-18", course: "Chemistry Fundamentals" },
      { id: "a004", title: "English Essay Draft", dueDate: "2024-10-25", course: "English Literature" },
    ],
  },
];

export const dummyTutors: Tutor[] = [
  {
    id: "t1",
    name: "Dr. Emily White",
    email: "emily.w@example.com",
    subjects: ["Mathematics", "Physics"],
    students: [
      { id: "s1", name: "Alice Smith" },
      { id: "s3", name: "Charlie Brown" },
    ],
    schedule: [
      { id: "sch001", date: "2024-10-10", time: "10:00 AM", studentName: "Alice Smith", subject: "Mathematics" },
      { id: "sch002", date: "2024-10-11", time: "02:00 PM", studentName: "Charlie Brown", subject: "Physics" },
    ],
  },
  {
    id: "t2",
    name: "Mr. David Green",
    email: "david.g@example.com",
    subjects: ["Chemistry", "English"],
    students: [
      { id: "s2", name: "Bob Johnson" },
      { id: "s4", name: "Diana Prince" },
    ],
    schedule: [
      { id: "sch003", date: "2024-10-12", time: "11:00 AM", studentName: "Bob Johnson", subject: "Chemistry" },
      { id: "sch004", date: "2024-10-13", time: "03:00 PM", studentName: "Diana Prince", subject: "English" },
    ],
  },
];