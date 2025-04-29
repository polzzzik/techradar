import React, { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = Cookies.get('jwt');
      if (!token) {
        navigate('/login');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
