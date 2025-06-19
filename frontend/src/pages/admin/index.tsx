import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Admin = lazy(() => import('./Admin'));
const Detail = lazy(() => import('./Detail'));

const AdminRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="details/:id" element={<Detail />} />
    </Routes>
  );
};

export default AdminRouting;
