export interface Warden {
  id: string;
  name: string;
  email: string;
  hostel: string;
  capacity: number;
  currentOccupancy: number;
}

export const dummyWardens: Warden[] = [
  {
    id: "w001",
    name: "Mr. John Doe",
    email: "john.d@example.com",
    hostel: "Boys Hostel A",
    capacity: 200,
    currentOccupancy: 180,
  },
  {
    id: "w002",
    name: "Ms. Jane Foster",
    email: "jane.f@example.com",
    hostel: "Girls Hostel B",
    capacity: 150,
    currentOccupancy: 145,
  },
];