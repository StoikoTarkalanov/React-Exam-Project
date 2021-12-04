/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <article className="cars-card">
      <h1 className="cars-card-title">{car.title}</h1>
      <article className="cars-card-image">
        <Link className="cars-card-image-link" to={`/details/${car.objectId}`}>
          <img src={car.imageUrl} alt="Image..." />
        </Link>
      </article>
      <h2 className="image-info">𝓢𝓮𝓮 𝓒𝓪𝓻 𝓓𝓮𝓽𝓪𝓲𝓵𝓼</h2>
    </article>
  );
};

export default CarCard;
