import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const AuthRouting = () => {

  return (
    <div className="p-4 mx-auto my-4">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AuthRouting;
