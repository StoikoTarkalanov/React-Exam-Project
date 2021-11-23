import { Link } from 'react-router-dom';

const Navigation = ({ isAuthenticated }) => {
  let guestNavigation = (
    <ul className='nav-menu'>
      <li>
        <Link to='/home'>Home</Link>
      </li>
      <li>
        <Link to='/all-cars'>All Cars</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </ul>
  );

  let userNavigation = (
    <ul className='nav-menu'>
      <li>
        <Link to='/home'>Home</Link>
      </li>
      <li>
        <Link to='/all-cars'>All Cars</Link>
      </li>
      <li>
        <Link to='/user-cars'>My Cars</Link>
      </li>
      <li>
        <Link to='/create'>Create Article</Link>
      </li>
      <li>
        <Link to='/logout'>Logout</Link>
      </li>
    </ul>
  );

  return (
    <header>
      <nav className='nav'>
        <article className='nav-logo'>
          <Link to='/home'>
            <h1>AutoStar</h1>
          </Link>
        </article>

        {isAuthenticated ? userNavigation : guestNavigation}
      
      </nav>
    </header>
  );
};

export default Navigation;
