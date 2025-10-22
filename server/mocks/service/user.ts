import { UserMap, UserType } from '~/server/mocks/storage';

export interface UserRequestBodyType {
  username: string;
  email: string;
  tel: string;
  password: string;
  isStudent: boolean;
  isTeacher: boolean;
}

export const validateUserData = (userData: UserRequestBodyType) => {
  const requiredFields = ['username', 'email', 'tel', 'password'];

  return requiredFields.every(
    (field) => !!userData[field as keyof UserRequestBodyType]
  );
};

export const getAuthUser = (cookie: Record<string, string>) => {
  const authToken = cookie['authToken'];

  if (!authToken) {
    return {
      status: 401,
    };
  }

  const user = UserMap.get(authToken);

  if (!user) {
    return { status: 403 };
  }

  return { status: 200, user };
};

export const createUser = (userData: UserRequestBodyType) => {
  const newUser: UserType = {
    id: new Date().getTime().toString(),
    username: userData.username,
    email: userData.email,
    tel: userData.tel,
    password: userData.password,
    isStudent: userData.isStudent,
    isTeacher: userData.isTeacher,
    enrolledCourses: [],
    createdClasses: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  UserMap.set(newUser.id, newUser);

  return {
    user: newUser,
    status: 201,
  };
};
