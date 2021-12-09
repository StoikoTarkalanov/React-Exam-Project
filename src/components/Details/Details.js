/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import * as carService from '../../services/carService';
import ModalDialog from '../Common/ModalDialog';
import Loading from '../Loading';

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [car, setCar] = useState({});
  const { user } = useAuth();
  const { carId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const detailsData = await carService.getCarById(carId);
      setCar(detailsData);
      setLoading(false);
    })();
  }, [carId, car.likes]);

  const deleteHandler = async (e) => {
    e.preventDefault();

    setModal(false);
    setLoading(true);    
    await carService.destroy(carId, user.sessionToken);
    setLoading(false);    
    navigate('/user-cars'); 
  }

  const deleteClickHandler = (e) => {
    e.preventDefault();
    setModal(true);
  }

  const likeClicked = async () => {
    if (car.likes.includes(user.objectId)) {
      return;
    }

    let likes = [...car.likes, user.objectId];
    const { title, imageUrl, content } = car;

    await carService.edit(carId, user.sessionToken,
      {
        title,
        imageUrl,
        content,
        likes,
      }
    );
  };

  const creatorButtons = (
    <>
      <Link className="details-cars-card-buttons-creator" to={`/edit/${carId}`}>Edit</Link>
      <a className="details-cars-card-buttons-creator" href="/#" onClick={deleteClickHandler}>Delete</a>
    </>
  );

  const isCreator = user?.objectId == car.owner?.objectId;
  const likeAdjust = car.likes?.length > 1 
    ? 'likes'
    : 'like';

  // const userButtons = <button className="details-cars-card-buttons-likes-like" onClick={likeClicked}>Like</button>;
  const isLiked = !car.likes?.includes(user.objectId)
    ? <button className="details-cars-card-buttons-likes-like" onClick={likeClicked}>Like</button>
    : '';

  const haveLikes = isCreator 
    ? `Your car have ${car.likes?.length} ${likeAdjust}`
    : `This car have ${car.likes?.length} ${likeAdjust}`;

  const manageUserMessage = isCreator 
    ? 'Your car don\'t have likes yet :(' 
    : 'This car don\'t have likes yet, like it first :)';

  return (
    <>
    <ModalDialog show={modal} onClose={() => setModal(false)} onSave={deleteHandler} />
    {loading ? <Loading /> : '' }
    <article className="details-cars-card">
    <article className="details-cars-card-wrap">
        <h1 className="details-cars-card-wrap-title">{car.title}</h1>
        <article className="details-cars-card-wrap-image">
          <img src={car.imageUrl} alt="Image..." />
        </article>
        <article className="details-cars-card-wrap-created-by">
          <h3 className="details-cars-card-wrap-created-by-content">Posted By: {car.createdBy}</h3>
        </article>
      </article>
      <p className="details-cars-card-content">{car.content}</p>
      <hr className="line-separator" />
      <article className="details-cars-card-buttons">
        {user?.objectId && (isCreator
          ? creatorButtons
          : isLiked
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
