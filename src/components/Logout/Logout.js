/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import Loading from '../Loading';

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await authService.logout(user.sessionToken);
      logout();
      navigate('/');
      if (!mountedRef.current) return null;
      setLoading(false);
    })();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return <Loading />;
};

export default Logout;
