/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as carService from '../../services/carService';
// import { AuthContext } from '../../contexts/AuthContext';

const Details = () => {
  // const navigate = useNavigate();
  // const { user } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const { carId } = useParams();

  useEffect(() => {
    
    (async () => {      
      // const detailsData = await carService.getCarById(carId);
      // setCar(detailsData.results);
      carService.getCarById(carId)
      .then(detailsData => {
          setCar(detailsData);
      });
    })();

}, [carId]);

  return (
    <article className="cars-card">
      <h1 className="cars-card-title">{car.title}</h1>
      <article className="cars-card-image">
        <img src={car.imageUrl} alt="Image..." />
      </article>
      <p className="cars-card-content">{car.content}</p>
    </article>
  );
};

export default Details;
