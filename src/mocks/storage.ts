export interface UserType {
  id: string;
  username: string;
  email: string;
  tel: string;
  password: string;
  userType: 'student' | 'teacher';
  createdAt: string;
  updatedAt: string;
}

export const UserMap = new Map<string, UserType>();
