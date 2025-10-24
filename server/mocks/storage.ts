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
  enrolledCourseIds: string[];
  createdClassIds: string[];
}

export class UserItem {
  public id: string = '';
  public username: string = '';
  public email: string = '';
  public tel: string = '';
  public password: string = '';
  public isStudent: boolean = false;
  public isTeacher: boolean = false;
  public createdAt: string = '';
  public updatedAt: string = '';
  public enrolledCourseIds: string[] = [];
  public createdClassIds: string[] = [];

  constructor(userItem: UserType) {
    this.id = userItem.id;
    this.username = userItem.username;
    this.email = userItem.email;
    this.tel = userItem.tel;
    this.password = userItem.password;
    this.isStudent = userItem.isStudent;
    this.isTeacher = userItem.isTeacher;
    this.createdAt = userItem.createdAt;
    this.updatedAt = userItem.updatedAt;
    this.enrolledCourseIds = userItem.enrolledCourseIds;
    this.createdClassIds = userItem.createdClassIds;
  }

  setUserItem(userItem: UserType) {
    this.id = userItem.id;
    this.username = userItem.username;
    this.email = userItem.email;
    this.tel = userItem.tel;
    this.password = userItem.password;
    this.isStudent = userItem.isStudent;
    this.isTeacher = userItem.isTeacher;
    this.createdAt = userItem.createdAt;
    this.updatedAt = userItem.updatedAt;
    this.enrolledCourseIds = userItem.enrolledCourseIds;
    this.createdClassIds = userItem.createdClassIds;
  }

  hasEnrolledCourseId(courseId: string) {
    return this.enrolledCourseIds.includes(courseId);
  }

  hasCreatedClassId(classId: string) {
    return this.createdClassIds.includes(classId);
  }

  public addEnrolledCourseId(courseId: string) {
    this.enrolledCourseIds = [...this.enrolledCourseIds, courseId];
  }

  public addCreatedClassId(classId: string) {
    this.createdClassIds = [...this.createdClassIds, classId];
  }
}

export type UserListType = UserItem[];

class UserStorage {
  private userMap: Map<string, UserItem>;

  constructor() {
    this.userMap = new Map<string, UserItem>();
  }

  setUser(userItem: UserItem) {
    this.userMap.set(userItem.id, userItem);
  }

  getUser(id: string) {
    return this.userMap.get(id);
  }
}

export { userStorage, classStorage };

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

export class ClassItem {
  public id: string = '';
  public title: string = '';
  public price: number = 0;
  public instructor: string = '';
  public enrolledUserIds: string[] = [];
  public total: number = 0;
  public createdAt: string = '';
  public updatedAt: string = '';

  constructor(classItem: ClassType) {
    this.id = classItem.id;
    this.title = classItem.title;
    this.price = classItem.price;
    this.instructor = classItem.instructor;
    this.enrolledUserIds = classItem.enrolledUserIds;
    this.total = classItem.total;
    this.createdAt = classItem.createdAt;
  }

  setClassItem(classItem: ClassType) {
    this.id = classItem.id;
    this.title = classItem.title;
    this.price = classItem.price;
    this.instructor = classItem.instructor;
    this.enrolledUserIds = classItem.enrolledUserIds;
    this.total = classItem.total;
    this.createdAt = classItem.createdAt;
  }

  public addEnrolledUserId(userId: string) {
    this.enrolledUserIds = [...this.enrolledUserIds, userId];
  }

  public removeEnrolledUserId(userId: string) {
    this.enrolledUserIds = this.enrolledUserIds.filter((id) => id !== userId);
  }
}

class ClassStorage {
  private classList: ClassItem[];

  constructor() {
    this.classList = [];
    this.generateClassList();
  }

  getClassList() {
    return this.classList;
  }

  addClassList(classItem: ClassItem) {
    this.classList = [...this.classList, classItem];
  }

  removeClassList(id: string) {
    this.classList = this.classList.filter((classItem) => classItem.id !== id);
  }

  addEnrolledUserId(id: string, userId: string) {
    this.classList = this.classList.map((classItem) => {
      if (classItem.id === id) {
        classItem.addEnrolledUserId(userId);
      }

      return classItem;
    });
  }

  selectClassItems(ids: string[]) {
    return this.classList.filter((classItem) => ids.includes(classItem.id));
  }

  generateClassList() {
    const now = new Date();

    for (let i = 1; i <= 20; i++) {
      const createdAt = new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000);

      const total = 50 + i * 10;
      const enrollmentRate = Math.min(0.1 + i * 0.05, 0.95);
      const enrolledCount = Math.floor(total * enrollmentRate);

      const enrolledUserIds = Array.from(
        { length: enrolledCount },
        (_, index) => `user${index + 1}`
      );

      const classItem = new ClassItem({
        id: `Class-${i}`,
        title: `Class ${i}`,
        price: i * 100000,
        instructor: `Coach ${i}`,
        enrolledUserIds: enrolledUserIds,
        total: total,
        createdAt: createdAt.toISOString(),
        updatedAt: createdAt.toISOString(), // Added missing required updatedAt field
      });

      this.addClassList(classItem);
    }
  }
}

export type ClassListType = ClassType[];

const userStorage = new UserStorage();
const classStorage = new ClassStorage();
