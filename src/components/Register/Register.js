const Register = () => {
  return (
    <>
      <article className="form">
        <h1 className="form-title">Register</h1>
        <form className="form-content">
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="password" name="repeatPassword" placeholder="Repeat Password" />
          <input type="submit" value="Register" />
        </form>
      </article>
    </>
  );
};

export default Register;
