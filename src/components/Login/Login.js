import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const onLoginHandler = (e) => {
      e.preventDefault();

      let formData = new FormData(e.currentTarget);

      let email = formData.get('email');

      authService.login(email);
      
      onLogin(email);

      navigate('/home');
  }

  return (
    <>
      <article className="form">
        <h1 className="form-title">Login</h1>
        <form className="form-content" onSubmit={onLoginHandler}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </article>
    </>
  );
};

export default Login;
