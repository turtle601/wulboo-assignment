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
  enrolledCourses: ClassListType;
  createdClasses: ClassListType;
}

export const UserMap = new Map<string, UserType>();

export interface ClassType {
  id: string;
  title: string;
  price: number;
  instructor: string;
  enrolledUserIds: string[]; // Set 대신 배열 사용
  total: number;
  createdAt: string;
  updatedAt: string;
}

export type ClassListType = ClassType[];

const generateClassList = (): ClassListType => {
  const classes: ClassListType = [];
  const now = new Date();

  for (let i = 1; i <= 20; i++) {
    const createdAt = new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000);

    const total = 50 + i * 10;
    const enrollmentRate = Math.min(0.1 + i * 0.05, 0.95);
    const enrolledCount = Math.floor(total * enrollmentRate);

    // enrolledUserIds 배열 생성 (각 클래스마다 고유한 user ID 생성)
    const enrolledUserIds = Array.from(
      { length: enrolledCount },
      (_, index) => `user${index + 1}`
    );

    classes.push({
      id: i.toString(),
      title: `Class ${i}`,
      price: i * 100000,
      instructor: `Coach ${i}`,
      enrolledUserIds: enrolledUserIds,
      total: total,
      createdAt: createdAt.toISOString(),
      updatedAt: createdAt.toISOString(),
    });
  }

  return classes;
};

export const classList: ClassListType = [
  {
    id: '1asdfasdf',
    title: 'Class 1asdfasd',
    price: 100000,
    instructor: 'Coach 1',
    enrolledUserIds: ['user1', 'user2', 'user3'],
    total: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  ...generateClassList(),
];
