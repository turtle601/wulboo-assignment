export interface UserType {
  id: string;
  username: string;
  email: string;
  tel: string;
  password: string;
  userType: 'student' | 'teacher';
  createdAt: string;
  updatedAt: string;
  enrolledCourses?: ClassListType;
}

export const UserMap = new Map<string, UserType>();

export interface ClassType {
  id: string;
  name: string;
  price: number;
  coach: string;
  currentApplicants: number;
  maxApplicants: number;
  createdAt: string;
  updatedAt: string;
}

export type ClassListType = ClassType[];

export const classList: ClassListType = [
  {
    id: '1',
    name: 'Class 1',
    price: 100000,
    coach: 'Coach 1',
    currentApplicants: 10,
    maxApplicants: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Class 2',
    price: 200000,
    coach: 'Coach 2',
    currentApplicants: 20,
    maxApplicants: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Class 3',
    price: 300000,
    coach: 'Coach 3',
    currentApplicants: 30,
    maxApplicants: 300,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Class 4',
    price: 400000,
    coach: 'Coach 4',
    currentApplicants: 40,
    maxApplicants: 400,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Class 5',
    price: 500000,
    coach: 'Coach 5',
    currentApplicants: 50,
    maxApplicants: 500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Class 6',
    price: 600000,
    coach: 'Coach 6',
    currentApplicants: 60,
    maxApplicants: 600,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Class 7',
    price: 700000,
    coach: 'Coach 7',
    currentApplicants: 70,
    maxApplicants: 700,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Class 8',
    price: 800000,
    coach: 'Coach 8',
    currentApplicants: 80,
    maxApplicants: 800,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Class 9',
    price: 900000,
    coach: 'Coach 9',
    currentApplicants: 90,
    maxApplicants: 900,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
