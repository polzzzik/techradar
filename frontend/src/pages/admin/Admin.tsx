import ManageGroup from '@/components/Admin/ManageGroup';
import isAdmin from '@/components/Auth/isAdmin';
import Table from '@/components/Table';
import { COLS } from '@/constants/cols';
import { Navigate } from 'react-router-dom';

const Admin = (): React.ReactNode => {
  if (!isAdmin()) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4">
      <ManageGroup />
      <Table items={COLS} />
    </div>
  );
};

export default Admin;
