import { Navigate } from 'react-router-dom';

import * as authService from '../../services/authService';

const Logout = ({ onLogout }) => {
  authService.logout();
  onLogout();

  return <Navigate to="/home" replace={true} />;
};

export default Logout;
