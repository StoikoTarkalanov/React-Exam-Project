import NotFound from '../components/NotFound/NotFound';
import { useAuth } from '../contexts/AuthContext';

export const isGuestGuard = (Component) => {

  const WrapperComponent = (props) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated
      ? <NotFound />
      : <Component {...props} />;
  };

  return WrapperComponent;
};
