export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActivity: string;
}

export const dummyAdmins: Admin[] = [
  {
    id: "a001",
    name: "Mr. Robert King",
    email: "robert.k@example.com",
    role: "Super Admin",
    lastActivity: "2024-07-29T11:00:00Z",
  },
  {
    id: "a002",
    name: "Ms. Laura Bell",
    email: "laura.b@example.com",
    role: "Hostel Admin",
    lastActivity: "2024-07-29T09:45:00Z",
  },
];