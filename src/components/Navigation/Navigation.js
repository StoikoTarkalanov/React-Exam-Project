const Navigation = () => {
  return (
    <header>
      <nav className='nav'>
        <article className='nav-logo'>
          <a href='#/'>
            <h1>AutoStar</h1>
          </a>
        </article>
        <ul className='nav-menu'>
          <li>
            <a href='#/'>Login</a>
          </li>
          <li>
            <a href='#/'>Register</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
