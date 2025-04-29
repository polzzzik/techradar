import { Button, DateField, InputField } from '@admiral-ds/react-ui';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  validateLogin,
  validatePassword,
  validateRepeatPassword,
  validateFirstname,
  validateLastname,
  validatePhoneNumber,
  formatPhoneNumber,
} from './validators';
import { useUserRegisterMutation } from '@/redux/api/user.api';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { TokenUser } from '@/types/TokenUser.interface';
import { setUser } from '@/redux/slices/userSlice';

export interface RegisterFormErrors {
  loginError?: string;
  passwordError?: string;
  repeatPasswordError?: string;
  firstnameError?: string;
  lastnameError?: string;
  phoneError?: string;
}

const RegisterForm = () => {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const [firstnameValue, setFirstnameValue] = useState('');
  const [lastnameValue, setLastnameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [birthdayValue, setBirthdayValue] = useState('');
  const [secondnameValue, setSecondnameValue] = useState('');

  const [authError, setAuthError] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [authFetch] = useUserRegisterMutation();

  const [registrationError, setRegistrationError] = useState<RegisterFormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      registrationError?.loginError ||
      registrationError?.passwordError ||
      registrationError?.repeatPasswordError ||
      registrationError?.firstnameError ||
      registrationError?.lastnameError ||
      registrationError?.phoneError
    ) {
      return;
    }
    const result = await authFetch({
      email: loginValue,
      password: passwordValue,
      confirmPassword: repeatPasswordValue,
      firstName: firstnameValue,
      lastName: lastnameValue,
      secondName: secondnameValue,
      birthday: birthdayValue,
      phoneNumber: phoneValue,
    });
    if (!result.error) {
      Cookies.set('user', result.data.accessToken, { expires: 7 });
      setAuthError('');
      const loginedUser: TokenUser = jwtDecode(result.data.accessToken);
      dispatch(setUser({ login: loginedUser.login, role: loginedUser.role }));
      navigate('/');
    } else {
      setAuthError('Ошибка при регистрации');
    }
  };

  const handlePhoneChange = (value: string) => {
    formatPhoneNumber(value, setPhoneValue);
  };

  return (
    <form
      className="p-4 mx-auto max-w-md my-4 shadow-md border rounded-lg"
      onSubmit={handleSubmit}
    >
      <span className="py-2 text-2xl">Регистрация</span>
      <section className="flex flex-col mt-4 gap-4">
        <section className="flex flex-row gap-4">
          <InputField
            id="authFirstname"
            displayClearIcon
            required
            label="Имя"
            value={firstnameValue}
            onChange={(e) => setFirstnameValue(e.target.value)}
            onBlur={() => validateFirstname(firstnameValue, setRegistrationError)}
            placeholder="Введите имя"
            status={registrationError.firstnameError ? 'error' : undefined}
            extraText={registrationError.firstnameError || ''}
          />
          <InputField
            id="authLastname"
            displayClearIcon
            required
            label="Фамилия"
            value={lastnameValue}
            onChange={(e) => setLastnameValue(e.target.value)}
            onBlur={() => validateLastname(lastnameValue, setRegistrationError)}
            placeholder="Введите фамилию"
            type="text"
            status={registrationError.lastnameError ? 'error' : undefined}
            extraText={registrationError.lastnameError || ''}
          />
        </section>
        <InputField
          id="authSecondname"
          displayClearIcon
          required
          label="Отчество"
          value={secondnameValue}
          onChange={(e) => setSecondnameValue(e.target.value)}
          placeholder="Введите отчество"
          type="text"
          status={registrationError.lastnameError ? 'error' : undefined}
          extraText={registrationError.lastnameError || ''}
        />
        <InputField
          status={registrationError.loginError ? 'error' : undefined}
          id="authEmail"
          extraText={registrationError.loginError || ''}
          displayClearIcon
          required
          label="Email"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          onBlur={() => validateLogin(loginValue, setRegistrationError)}
          placeholder="Введите email"
          type="email"
        />
        <InputField
          status={registrationError.phoneError ? 'error' : undefined}
          id="authPhone"
          extraText={registrationError.phoneError || ''}
          displayClearIcon
          required
          label="Телефон"
          value={phoneValue}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={() => validatePhoneNumber(phoneValue, setRegistrationError)}
          placeholder="Номер телефона в формате +7... "
          type="tel"
        />
        <DateField
          id="authDate"
          value={birthdayValue}
          onChange={(e) => setBirthdayValue(e.target.value)}
          placeholder="Введите дату рождения"
          dropContainerClassName="dropContainerClass"
          label="Дата рождения"
        />
        <InputField
          status={registrationError.passwordError ? 'error' : undefined}
          id="authPassword"
          extraText={registrationError.passwordError || ''}
          displayClearIcon
          required
          label="Пароль"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          onBlur={() => validatePassword(passwordValue, setRegistrationError)}
          placeholder="Введите пароль"
          type="password"
        />
        <InputField
          status={registrationError.repeatPasswordError ? 'error' : undefined}
          id="authRePassword"
          extraText={registrationError.repeatPasswordError || ''}
          displayClearIcon
          required
          label="Подтвердить пароль"
          value={repeatPasswordValue}
          onChange={(e) => setRepeatPasswordValue(e.target.value)}
          onBlur={() =>
            validateRepeatPassword(
              repeatPasswordValue,
              passwordValue,
              setRegistrationError
            )
          }
          placeholder="Повторите пароль"
          type="password"
        />
      </section>
      <section className="my-4 flex justify-center">
        <Button className="mx-auto block" type="submit" dimension="m">
          Зарегистрироваться
        </Button>
      </section>
      <small className="text-negative">{authError}</small>
      <small>
        Уже есть аккаунт?
        <Link className="font-semibold text-main ml-1" to={'/auth/login'}>
          Войти
        </Link>
      </small>
    </form>
  );
};

export default RegisterForm;
