export const validatePasswordLength = (element: HTMLInputElement) => {
  const value = element.value;

  if (value.length <= 6 || value.length >= 10) {
    return true;
  }

  return false;
};

export const validatePasswordCombination = (element: HTMLInputElement) => {
  const value = element.value;

  const hasLowerCase = /[a-z]/.test(value);
  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);

  const conditionCount = [hasLowerCase, hasUpperCase, hasNumber].filter(
    Boolean
  ).length;

  return conditionCount < 2;
};
