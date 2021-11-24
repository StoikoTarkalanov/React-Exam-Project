const Register = () => {
  return (
      <article className="form-validate">
        <h1 className="form-validate-title">Register</h1>
        <form className="form-validate-content">
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="password" name="repeatPassword" placeholder="Repeat Password" />
          <input type="submit" value="Register" />
        </form>
      </article>
  );
};

export default Register;
