import NotFound from '../components/NotFound/NotFound';
import { useAuth } from '../contexts/AuthContext';

export const isUserGuard = (Component) => {

  const WrapperComponent = (props) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated
      ? <Component {...props} /> 
      : <NotFound />;
  };

  return WrapperComponent;
};
