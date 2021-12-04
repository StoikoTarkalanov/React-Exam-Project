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
      <Link className="details-cars-card-buttons-creator" to={`/edit/${carId}`}>Edit</Link>
      <a className="details-cars-card-buttons-creator" href="/#" onClick={deleteHandler}>Delete</a>
    </>
  );

  const isCreator = user?.objectId == car.owner?.objectId;
  const likeAdjust = car.likes?.length > 1 
    ? 'likes'
    : 'like';

  const userButtons = <a className="details-cars-card-buttons-likes-like" href="/#">Like</a>;

  const haveLikes = isCreator 
    ? `Your car have ${car.likes?.length} ${likeAdjust}`
    : `This car have ${car.likes?.length} ${likeAdjust}`;

  const manageUserMessage = isCreator 
    ? 'Your car don\'t have likes yet :(' 
    : 'This car don\'t have likes yet, like it first :)';

  return (
    <>
    {loading ? <Loading /> : '' }
    <article className="details-cars-card">
    <article className="details-cars-card-wrap">
        <h1 className="details-cars-card-wrap-title">{car.title}</h1>
        <article className="details-cars-card-wrap-image">
          <img src={car.imageUrl} alt="Image..." />
        </article>
      </article>
      <p className="details-cars-card-content">{car.content}</p>
      <article className="details-cars-card-buttons">
        {user?.objectId && (isCreator
          ? creatorButtons
          : userButtons
        )}
        <article className="details-cars-card-buttons-likes">
          <span className="details-cars-card-buttons-likes-total">
            {user?.objectId && (car.likes?.length > 0
              ? haveLikes
              : manageUserMessage
            )}
          </span>
        </article>
      </article>
    </article>
    </>
  );
};

export default Details;
