/* eslint-disable no-useless-escape */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isGuestGuard } from '../../hoc/isGuestGuard';
import * as authService from '../../services/authService';
import Loading from '../Loading';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: undefined, 
    password: undefined, 
    rePassword: undefined, 
    database: undefined
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const controller = useMemo(() => {
    const controller = new AbortController();
    return controller;
  }, []);

  useEffect(() => {
    return () => {
      controller.abort();
   };
  }, [controller]);


  const onRegisterHandler = async (e) => {
    e.preventDefault();
    setErrors(state => ({...state, database: undefined}));
    
    if (errors.email !== undefined || errors.password !== undefined || errors.rePassword !== undefined) {
      return;
    }

    let formData = new FormData(e.currentTarget);

    let username = formData.get('username');
    let password = formData.get('password');
    let rePassword = formData.get('repeatPassword');

    if (password !== rePassword) {
      setErrors(state => ({...state, rePassword: 'Passwords don\'t match'}));
      return
    } else {
      setErrors(state => ({...state, rePassword: undefined}));
    }

    setLoading(true);
    try {
      const authData = await authService.register(username, password, controller.signal);
      const { objectId, sessionToken } = authData;
      
      const { code, error } = authData;
      if (code) {
        throw error;
      }
      
      setLoading(false);
      login({ objectId, username, sessionToken });

      navigate('/');
    } catch (error) {
      setLoading(false);
      let message = error === 'bad or missing username' ? 'Email is required' : error;
      setErrors(state => ({...state, database: message }));
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
    } else if (password.length > 20) {
      setErrors(state => ({...state, password: 'Your password should be less than 20 characters!'}));
    } else {
      setErrors(state => ({...state, password: undefined}));
    }
  }

  const rePasswordHandler = (e) => {
    let rePassword = e.target.value;
    if (rePassword.length < 6) {
      setErrors(state => ({...state, rePassword: 'Your password should be at least 6 characters long!'}));
    } else if (rePassword.length > 20) {
      setErrors(state => ({...state, rePassword: 'Your password should be less than 20 characters!'}));
    } else {
      setErrors(state => ({...state, rePassword: undefined}));
    }
  }

  return (
    <>
      {loading ? <Loading /> : '' }
      <article className="form-validate">
        <h1 className="form-validate-title">Register</h1>
        <form className="form-validate-content" method="POST" onSubmit={onRegisterHandler}>
          <input type="email" name="username" placeholder="Email" onChange={emailHandler} />
          <h5 className="form-error-message">
            {errors.email !== undefined ? errors.email : ''}
          </h5>
          <input type="password" name="password" placeholder="Password" onChange={passwordHandler} />
          <h5 className="form-error-message">
            {errors.password !== undefined ? errors.password : '' }
          </h5>
          <input type="password" name="repeatPassword" placeholder="Confirm Password" onChange={rePasswordHandler} />
          <h5 className="form-error-message">
            {errors.rePassword !== undefined ? errors.rePassword : '' }
          </h5>
          <h5 className="form-error-message">
            {errors.database !== undefined ? errors.database : '' }
          </h5>
          <input type="submit" value="Register" />
        </form>
      </article>
    </>
  );
};

export default isGuestGuard(Register);
