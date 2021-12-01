/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <article className="cars-card">
      <h1 className="cars-card-title">{car.title}</h1>
      <article className="cars-card-image">
        <img src={car.imageUrl} alt="Image..." />
      </article>
      <button className="cars-card-button">
        <Link className="cars-card-button-link" to={`/details/${car.objectId}`}>
          See Details
        </Link>
      </button>
    </article>
  );
};

export default CarCard;
