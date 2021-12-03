import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let name = formData.get('username');
    let password = formData.get('password');

    try {
      const authData = await authService.login(name, password);
      const { objectId, username, sessionToken } = authData;
      
      const { code, error } = authData;
      if (code) {
        throw error;
      }
      
      login({ objectId, username, sessionToken });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="form-validate">
      <h1 className="form-validate-title">Login</h1>
      <form className="form-validate-content" method="POST" onSubmit={onLoginHandler}>
        <input type="email" name="username" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </article>
  );
};

export default Login;
