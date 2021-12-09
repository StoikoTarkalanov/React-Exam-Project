/* eslint-disable no-useless-escape */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isGuestGuard } from '../../hoc/isGuestGuard';
import * as authService from '../../services/authService';
import Loading from '../Loading';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({email: undefined, password: undefined, database: undefined});
  const mountedRef = useRef(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      mountedRef.current = false;
   };
  }, []);

  const onLoginHandler = async (e) => {
    e.preventDefault();
    setErrors(state => ({...state, database: undefined}));

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
      if (!mountedRef.current) return null;
      setLoading(false);
      let message = error === 'username/email is required.' ? 'email is required' : error;
      setErrors(state => ({...state, database: message}));
    }
  };

  const emailHandler = (e) => {
    let email = e.target.value;
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(pattern)) {
      setErrors(state => ({...state, email: 'Your email is invalid!'}));
    } else {
      setErrors(state => ({...state, email: undefined}));
    }
  }

  const passwordHandler = (e) => {
    let password = e.target.value;
    if (password.length < 6) {
      setErrors(state => ({...state, password: 'Your password should be at least 6 characters long!'}));
    } else {
      setErrors(state => ({...state, password: undefined}));
    }
  }

  return (
    <>
      {loading ? <Loading /> : ''}
      <article className="form-validate">
        <h1 className="form-validate-title">Login</h1>
        <form className="form-validate-content" method="POST" onSubmit={onLoginHandler}>
          <input type="email" name="username" placeholder="Email" onChange={emailHandler} />
          <span className="form-error-message">
            {errors.email !== undefined ? errors.email : ''}
          </span>
          <input type="password" name="password" placeholder="Password" onChange={passwordHandler} />
          <span>
            <span className="form-error-message">
              {errors.password !== undefined ? errors.password : '' }
            </span>
            <span className="form-error-message">
              {errors.database !== undefined ? errors.database : '' }
            </span>
          </span>
          <input type="submit" value="Login" />
        </form>
      </article>
    </>
  );
};

export default isGuestGuard(Login);
