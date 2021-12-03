/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as carService from '../../services/carService';
import { AuthContext } from '../../contexts/AuthContext';

const Details = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const { carId } = useParams();

  
  useEffect(() => {
    (async () => {
      const detailsData = await carService.getCarById(carId);
      setCar(detailsData);
    })();
  }, [carId]);

  const deleteHandler = async (e) => {
    e.preventDefault();

    const destroyData = await carService.destroy(carId, user.sessionToken);
    console.log(destroyData);
    navigate('/user-cars');
  }

  const creatorButtons = (
    <>
      <Link className="cars-card-buttons-creator" to="edit">Edit</Link>
      <a className="cars-card-buttons-creator" href="/#" onClick={deleteHandler}>Delete</a>
    </>
  );

  const userButtons = <a className="cars-card-buttons-likes-like" href="/#">Like</a>;
  const haveLikes = `This car have ${car.likes?.length} likes`;

  return (
    <article className="cars-card">
      <h1 className="cars-card-title">{car.title}</h1>
      <article className="cars-card-image">
        <img src={car.imageUrl} alt="Image..." />
      </article>
      <p className="cars-card-content">{car.content}</p>
      <article className="cars-card-buttons">
        {user?.objectId && 
        (user?.objectId == car.owner?.objectId
          ? creatorButtons
          : userButtons
        )}
        <article className="cars-card-buttons-likes">
          <span className="cars-card-buttons-likes-total">
            {user?.objectId && (car.likes?.length > 0
              ? haveLikes
              : 'This car don\'t have likes yet, like it first 🙂')
            }
          </span>
        </article>
      </article>
    </article>
  );
};

export default Details;
