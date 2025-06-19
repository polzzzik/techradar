import { RegisterFormErrors } from './RegisterForm';

export const validateLogin = (
  value: string,
  setRegistrationError: React.Dispatch<React.SetStateAction<RegisterFormErrors>>
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    setRegistrationError((prev) => ({ ...prev, loginError: 'Некорректный email' }));
  } else {
    setRegistrationError((prev) => ({ ...prev, loginError: undefined }));
  }
};

export const validatePassword = (
  value: string,
  setRegistrationError: React.Dispatch<React.SetStateAction<RegisterFormErrors>>
) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(value)) {
    setRegistrationError((prev) => ({
      ...prev,
      passwordError: 'Пароль должен содержать минимум 8 символов, букву и цифру',
    }));
  } else {
    setRegistrationError((prev) => ({ ...prev, passwordError: undefined }));
  }
};

export const validateRepeatPassword = (
  value: string,
  passwordValue: string,
  setRegistrationError: React.Dispatch<React.SetStateAction<RegisterFormErrors>>
) => {
  if (value !== passwordValue) {
    setRegistrationError((prev) => ({
      ...prev,
      repeatPasswordError: 'Пароли не совпадают',
    }));
  } else {
    setRegistrationError((prev) => ({ ...prev, repeatPasswordError: undefined }));
  }
};

export const validateFirstname = (
  value: string,
  setRegistrationError: React.Dispatch<React.SetStateAction<RegisterFormErrors>>
) => {
  const nameRegex = /^[A-Za-zА-Яа-я]{1,}$/;
  if (!nameRegex.test(value)) {
    setRegistrationError((prev) => ({
      ...prev,
      firstnameError: 'Имя должно содержать только буквы',
    }));
  } else {
    setRegistrationError((prev) => ({ ...prev, firstnameError: undefined }));
  }
};

export const validateLastname = (
  value: string,
  setRegistrationError: React.Dispatch<React.SetStateAction<RegisterFormErrors>>
) => {
  const nameRegex = /^[A-Za-zА-Яа-я]{1,}$/;
  if (!nameRegex.test(value)) {
    setRegistrationError((prev) => ({
      ...prev,
      lastnameError: 'Фамилия должна содержать только буквы',
    }));
  } else {
    setRegistrationError((prev) => ({ ...prev, lastnameError: undefined }));
  }
};

export const formatPhoneNumber = (
  value: string,
  setFunction: (value: string) => void
) => {
  const cleaned = value.replace(/\D/g, '');

  const match = cleaned.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (match) {
    const formattedNumber = `+${match[1]}${match[2] ? ` (${match[2]}` : ''}${match[3] ? `) ${match[3]}` : ''}${match[4] ? `-${match[4]}` : ''}${match[5] ? `-${match[5]}` : ''}`;
    setFunction(formattedNumber);
  } else {
    setFunction(value);
  }
};

export const validatePhoneNumber = (
  value: string,
  setRegistrationError: React.Dispatch<React.SetStateAction<RegisterFormErrors>>
) => {
  const cleaned = value.replace(/\D/g, '');
  if (!/^7\d{10}$/.test(cleaned)) {
    setRegistrationError({
      phoneError: 'Номер должен быть в формате +7 (xxx) xxx-xx-xx',
    });
  } else {
    setRegistrationError({ phoneError: undefined });
  }
};
