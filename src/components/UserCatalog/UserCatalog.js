/* eslint-disable jsx-a11y/img-redundant-alt */
import BMW from '../images/BMW E30.png';
import Mercedes from '../images/Mercedes 190 SL.jpg';
import { Link } from 'react-router-dom';

const UserCatalog = () => {
  return (
    <>
      <h1 className="catalog-title">My Cars</h1>

      <section className="cars">
        <article className="cars-card">
          <h1 className="cars-card-title">User Car Heading</h1>
          <article className="cars-card-image">
            <img src={Mercedes} alt="Image..." />
          </article>
          <button className="cars-card-button">
            <Link className="cars-card-button-link" to="/details">See Details</Link>
          </button>
        </article>

        <article className="cars-card">
          <h1 className="cars-card-title">User Car Heading 2</h1>
          <article className="cars-card-image">
            <img src={BMW} alt="Image..." />
          </article>
          <button className="cars-card-button">
            <Link className="cars-card-button-link" to="/details">See Details</Link>
          </button>
        </article>

        <article className="cars-card">
          <h1 className="cars-card-title">User Car Heading 2</h1>
          <article className="cars-card-image">
            <img src={BMW} alt="Image..." />
          </article>
          <button className="cars-card-button">
            <Link className="cars-card-button-link" to="/details">See Details</Link>
          </button>
        </article>
      </section>
    </>
  );
};

export default UserCatalog;
