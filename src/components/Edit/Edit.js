import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isUserGuard } from '../../hoc/isUserGuard';
import * as carService from '../../services/carService';
import Loading from '../Loading';

const Edit = () => {
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState({});
  const [errors, setErrors] = useState({
    title: undefined,
    image: undefined,
    content: undefined,
    database: undefined,
  });
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
    setErrors(state => ({...state, database: undefined}));
    
    if (errors.title !== undefined || errors.image !== undefined || errors.content !== undefined) {
      return;
    }

    const { title, imageUrl, content } = Object.fromEntries(new FormData(e.currentTarget));

    setLoading(true);

    try {
      const editData = await carService.edit(carId, user.sessionToken, 
        {
          title, 
          imageUrl,
          content,
        }
      );

      const { code, error } = editData;
      if (code) {
        throw error;
      }
      setLoading(false);

      navigate(`/details/${carId}`);    
    } catch (error) {
      setLoading(false);
      setErrors(state => ({...state, database: error}));
    }
  };

  const titleHandler = (e) => {
    let title = e.target.value;
    if (title.length < 3) {
      setErrors(state => ({ ...state, title: 'Title must be at lest 3 characters long!' }));
    } else if(title.length > 50) {
      setErrors(state => ({ ...state, title: 'Title must be less than 50 characters!' }));
    } else {
      setErrors(state => ({ ...state, title: undefined }));
    }
  };

  const imageHandler = (e) => {
    let url = e.target.value;
    if (url.substring(0, 8) === 'https://' || url.substring(0, 7) === 'http://') {
      setErrors(state => ({ ...state, image: undefined }));
    } else {
      setErrors(state => ({ ...state, image: 'URL is invalid!' }));
    }
  };

  const contentHandler = (e) => {
    let content = e.target.value;
    if (content.length < 60) {
      setErrors(state => ({ ...state, content: 'Car information must be at least 60 characters long!' }));
    } else if (content.length > 800) {
      setErrors(state => ({ ...state, content: 'Car information must be less than 800 characters!' }));
    } else {
      setErrors(state => ({ ...state, content: undefined }));
    }
  };

  return (
    <>
      {loading ? <Loading /> : ''}
      <article className="form-car">
        <h1 className="form-car-title">Edit</h1>
        <form className="form-car-content" method="PUT" onSubmit={editHandler}>
          <input type="text" id="title" name="title" defaultValue={carData?.title} onChange={titleHandler} />
          <span className="form-error-message">
            {errors.title !== undefined ? errors.title : ''}
          </span>
          <input type="text" id="url" name="imageUrl" defaultValue={carData?.imageUrl} onChange={imageHandler} />
          <span className="form-error-message">
            {errors.image !== undefined ? errors.image : ''}
          </span>
          <textarea id="content" name="content" rows="8" cols="70" defaultValue={carData?.content} onChange={contentHandler} />
          <br /> <br />
          <span>
            <span className="form-error-message">
              {errors.content !== undefined ? errors.content : ''}
            </span>
            <span className="form-error-message">
                {errors.database !== undefined ? errors.database : '' }
            </span>
          </span>
          <input type="submit" value="Edit" />
        </form>
      </article>
    </>
  );
};

export default isUserGuard(Edit);
