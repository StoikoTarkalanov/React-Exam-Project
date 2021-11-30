import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let email = formData.get('email');
    let username = formData.get('username');
    let password = formData.get('password');

    const authData = await authService.login(username, password);
    console.log(authData);

    onLogin(email);

    navigate('/');
  };

  return (
    <article className="form-validate">
      <h1 className="form-validate-title">Login</h1>
      <form className="form-validate-content" onSubmit={onLoginHandler}>
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </article>
  );
};

export default Login;
