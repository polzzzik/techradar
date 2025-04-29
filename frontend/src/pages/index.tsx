import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Poll from './Poll';

const NotFound = lazy(() => import('./NotFound'));
const AdminRouting = lazy(() => import('./admin'));
const AuthRouting = lazy(() => import('./auth'));
const Techradar = lazy(() => import('./Techradar'));

export const Routing = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminRouting />} />
        <Route path="/auth/*" element={<AuthRouting />} />
        <Route path="/poll" element={<Poll />} />
        <Route path="/:techradarTag" element={<Techradar />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
