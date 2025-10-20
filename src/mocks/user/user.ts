import { UserType, UserMap } from '~/src/mocks/storage';
import { UserRequestBodyType } from '~/src/entities/user/api/create-user';

const validateDuplicateEmail = (email: string) => {
  return Array.from(UserMap.values()).some((user) => user.email === email);
};

const validateRequiredFields = (userData: UserRequestBodyType) => {
  const requiredFields = ['username', 'email', 'tel', 'password', 'userType'];

  return requiredFields.every(
    (field) => !!userData[field as keyof UserRequestBodyType]
  );
};

export const createUser = (userData: UserRequestBodyType): number => {
  try {
    if (!validateRequiredFields(userData)) {
      return 400;
    }

    if (validateDuplicateEmail(userData.email)) {
      return 409;
    }

    const newUser: UserType = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      tel: userData.tel,
      password: userData.password,
      isStudent: userData.isStudent,
      isTeacher: userData.isTeacher,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    UserMap.set(newUser.id, newUser);

    return 201; // Created
  } catch (error) {
    console.error('User creation failed:', error);
    return 500; // Internal Server Error
  }
};
