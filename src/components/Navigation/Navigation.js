import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const { user } = useContext(AuthContext);

  let guestNavigation = (
    <ul className="nav-menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-cars">All Cars</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );

  let userNavigation = (
    <ul className="nav-menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-cars">All Cars</Link>
      </li>
      <li>
        <Link to="/user-cars">My Cars</Link>
      </li>
      <li>
        <Link to="/create">Create Article</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    </ul>
  );

  return (
    <header>
      <nav className="nav">
        <article className="nav-logo">
          <Link to="/">
            <h1>AutoStar</h1>
          </Link>
        </article>
        {user.username ? userNavigation : guestNavigation} 
      </nav>
    </header>
  );
};

export default Navigation;
