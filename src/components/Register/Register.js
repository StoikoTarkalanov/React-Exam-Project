import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log('In Register');

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    console.log('In Register Handler');

    let formData = new FormData(e.currentTarget);

    let username = formData.get('username');
    let password = formData.get('password');

    try {
      const authData = await authService.register(username, password);
      const { objectId, sessionToken } = authData;
      console.log('Data recieved', authData);
      
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
        <h1 className="form-validate-title">Register</h1>
        <form className="form-validate-content" method="POST" onSubmit={onRegisterHandler}>
          <input type="email" name="username" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="password" name="repeatPassword" placeholder="Repeat Password" />
          <input type="submit" value="Register" />
        </form>
      </article>
  );
};

export default Register;
