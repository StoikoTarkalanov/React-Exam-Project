import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import Loading from '../Loading';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let name = formData.get('username');
    let password = formData.get('password');

    setLoading(true);
    try {
      const authData = await authService.login(name, password);
      const { objectId, username, sessionToken } = authData;

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
      {loading ? <Loading /> : ''}
      <article className="form-validate">
        <h1 className="form-validate-title">Login</h1>
        <form
          className="form-validate-content"
          method="POST"
          onSubmit={onLoginHandler}
        >
          <input type="email" name="username" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </article>
    </>
  );
};

export default Login;
