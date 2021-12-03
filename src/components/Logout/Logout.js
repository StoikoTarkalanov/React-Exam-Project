/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import Loading from '../Loading';

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await authService.logout(user.sessionToken);
      logout();
      setLoading(false);
      navigate('/');
    })();
  }, []);

  // Should use loading
  return <Loading />;
};

export default Logout;
