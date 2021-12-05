import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isGuestGuard } from '../../hoc/isGuestGuard';
import * as authService from '../../services/authService';
import Loading from '../Loading';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onRegisterHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let username = formData.get('username');
    let password = formData.get('password');

    setLoading(true);
    try {
      const authData = await authService.register(username, password);
      const { objectId, sessionToken } = authData;
      
      const { code, error } = authData;
      if (code) {
        throw error;
      }
      
      login({ objectId, username, sessionToken });
      setLoading(false);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? <Loading /> : '' }
      <article className="form-validate">
        <h1 className="form-validate-title">Register</h1>
        <form className="form-validate-content" method="POST" onSubmit={onRegisterHandler}>
          <input type="email" name="username" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="password" name="repeatPassword" placeholder="Repeat Password" />
          <input type="submit" value="Register" />
        </form>
      </article>
    </>
  );
};

export default isGuestGuard(Register);
