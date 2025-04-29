import { useUserLoginMutation } from '@/redux/api/user.api';
import { Button, InputField } from '@admiral-ds/react-ui';
import { FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import { TokenUser } from '@/types/TokenUser.interface';

const AuthForm = () => {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loginError, setLoginError] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loginFetch] = useUserLoginMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const result = await loginFetch({ email: loginValue, password: passwordValue });

    if (!result.error) {
      Cookies.set('user', result.data.accessToken, { expires: 7 });
      setLoginError('');
      const loginedUser: TokenUser = jwtDecode(result.data.accessToken);
      dispatch(setUser({ login: loginedUser.login, role: loginedUser.role }));
      navigate('/');
    } else {
      setLoginError('Ошибка при входе');
    }
  };

  return (
    <form
      className="p-4 mx-auto max-w-md my-4 shadow-md border rounded-lg"
      onSubmit={handleSubmit}
    >
      <span className="py-2 text-2xl">Войти</span>
      <section className="flex flex-col mt-4 gap-4">
        <InputField
          status={loginError !== '' ? 'error' : undefined}
          id="login"
          extraText=""
          displayClearIcon
          required
          label="Логин"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          placeholder="Введите логин"
        />
        <InputField
          status={loginError !== '' ? 'error' : undefined}
          id="password"
          extraText={loginError ? loginError : ''}
          displayClearIcon
          required
          label="Пароль"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="Введите пароль"
          type="password"
        />
      </section>
      <section className="my-4 flex justify-center">
        <Button className="mx-auto block" type="submit" dimension="m">
          Войти
        </Button>
      </section>
      <small>
        Нет аккаунта?
        <Link className="font-semibold text-main ml-1" to={'/auth/register'}>
          Зарегистрироваться
        </Link>
      </small>
    </form>
  );
};

export default AuthForm;
