import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <footer className='footer'>
      <article className='footer-information'>
        <p className='footer-information-text'>
          &copy; 2021 All Rights Reserved.
        </p>
        <p className='footer-information-link'>
          <Link to='/'>AutoStar</Link>
        </p>
      </article>
    </footer>
  );
};

export default Navigation;
