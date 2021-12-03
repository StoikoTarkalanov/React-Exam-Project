/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';

const Logout = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await authService.logout(user.sessionToken);
      logout();
      navigate('/');
    })();
  }, []);

  // Should use loading
  return null;
};

export default Logout;
