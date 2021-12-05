import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isUserGuard } from '../../hoc/isUserGuard';
import * as carService from '../../services/carService';
import Loading from '../Loading';

const Edit = () => {
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState({});
  const { user } = useAuth();
  const { carId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const editData = await carService.getCarById(carId);
      setCarData(editData);
      setLoading(false);
    })();
  }, [carId]);

  const editHandler = async (e) => {
    e.preventDefault();

    const { title, imageUrl, content } = Object.fromEntries(new FormData(e.currentTarget));

    setLoading(true);
    await carService.edit(carId, user.sessionToken, 
      {
        title, 
        imageUrl, 
        content,
      }
    );

    setLoading(false);
    navigate(`/details/${carId}`);
  }

  return (
    <>
      {loading ? <Loading /> : ''}
      <article className="form-car">
        <h1 className="form-car-title">Edit</h1>
        <form className="form-car-content" method="PUT" onSubmit={editHandler}>
          <input type="text" id="title" name="title" defaultValue={carData?.title} />
          <input type="text" id="url" name="imageUrl" defaultValue={carData?.imageUrl} />
          <textarea id="content" name="content" rows="8" cols="70" defaultValue={carData?.content} />
          <input type="submit" value="Edit" />
        </form>
      </article>
    </>
  );
};

export default isUserGuard(Edit);
