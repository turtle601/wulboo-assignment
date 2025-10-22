import { UserType, UserMap } from '~/server/mocks/storage';
import { UserRequestBodyType } from '~/src/entities/user/api/create-user';

const validateRequiredFields = (userData: UserRequestBodyType) => {
  const requiredFields = ['username', 'email', 'tel', 'password'];

  return (
    requiredFields.every(
      (field) => !!userData[field as keyof UserRequestBodyType]
    ) &&
    (userData.isStudent || userData.isTeacher)
  );
};

export const createUser = (userData: UserRequestBodyType) => {
  try {
    if (!validateRequiredFields(userData)) {
      return { status: 400 };
    }

    const newUser: UserType = {
      id: Date.now().toString(),
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
      status: 201,
      headers: {
        'Set-Cookie': `authToken=${newUser.id}`,
      },
    };
  } catch (error) {
    console.error('User creation failed:', error);
    return { status: 500 }; // Internal Server Error
  }
};
