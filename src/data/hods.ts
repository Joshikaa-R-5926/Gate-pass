export interface HOD {
  id: string;
  name: string;
  email: string;
  department: string;
  studentsManaged: number;
}

export const dummyHODs: HOD[] = [
  {
    id: "h001",
    name: "Dr. Alex Chen",
    email: "alex.c@example.com",
    department: "Computer Science",
    studentsManaged: 350,
  },
  {
    id: "h002",
    name: "Dr. Maria Garcia",
    email: "maria.g@example.com",
    department: "Electrical Engineering",
    studentsManaged: 300,
  },
];