export interface UserType {
  id: string;
  username: string;
  email: string;
  tel: string;
  password: string;
  isStudent: boolean;
  isTeacher: boolean;
  createdAt: string;
  updatedAt: string;
  enrolledCourses?: ClassListType;
}

export const UserMap = new Map<string, UserType>();

export interface ClassType {
  id: string;
  title: string;
  price: number;
  instructor: string;
  enrolled: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export type ClassListType = ClassType[];

export const classList: ClassListType = [
  {
    id: '1',
    title: 'Class 1',
    price: 100000,
    instructor: 'Coach 1',
    enrolled: 10,
    total: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Class 2',
    price: 200000,
    instructor: 'Coach 2',
    enrolled: 20,
    total: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Class 3',
    price: 300000,
    instructor: 'Coach 3',
    enrolled: 30,
    total: 300,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Class 4',
    price: 400000,
    instructor: 'Coach 4',
    enrolled: 40,
    total: 400,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Class 5',
    price: 500000,
    instructor: 'Coach 5',
    enrolled: 50,
    total: 500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Class 6',
    price: 600000,
    instructor: 'Coach 6',
    enrolled: 60,
    total: 600,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Class 7',
    price: 700000,
    instructor: 'Coach 7',
    enrolled: 70,
    total: 700,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Class 8',
    price: 800000,
    instructor: 'Coach 8',
    enrolled: 80,
    total: 800,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Class 9',
    price: 900000,
    instructor: 'Coach 9',
    enrolled: 90,
    total: 900,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
