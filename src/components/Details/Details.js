/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as carService from '../../services/carService';
import Loading from '../Loading';

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { carId } = useParams();
  
  useEffect(() => {

    (async () => {
      const detailsData = await carService.getCarById(carId);
      setCar(detailsData);
      setLoading(false);
    })();

  }, [carId]);

  const deleteHandler = async (e) => {
    e.preventDefault();

    setLoading(true);    
    // const destroyData =    Should ask if you want to delete ? 
    await carService.destroy(carId, user.sessionToken);
    setLoading(false);
    
    navigate('/user-cars');
  }

  const creatorButtons = (
    <>
      <Link className="cars-card-buttons-creator" to={`/edit/${carId}`}>Edit</Link>
      <a className="cars-card-buttons-creator" href="/#" onClick={deleteHandler}>Delete</a>
    </>
  );

  const userButtons = <a className="cars-card-buttons-likes-like" href="/#">Like</a>;
  const haveLikes = `This car have ${car.likes?.length} likes`;

  return (
    <>
    {loading ? <Loading /> : '' }
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
    </>
  );
};

export default Details;
