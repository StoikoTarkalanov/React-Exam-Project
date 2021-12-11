import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isUserGuard } from '../../hoc/isUserGuard';
import * as carService from '../../services/carService';
import Loading from '../Loading';

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: undefined,
    image: undefined,
    content: undefined,
    database: undefined,
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const onCreate = async (e) => {
    e.preventDefault();
    setErrors(state => ({...state, database: undefined}));
    
    if (errors.title !== undefined || errors.image !== undefined || errors.content !== undefined) {
      return;
    }

    let formData = new FormData(e.currentTarget);

    let title = formData.get('title');
    let imageUrl = formData.get('url');
    let content = formData.get('content');

    setLoading(true);
    try {
      const createData = await carService.create(
        {
          title,
          imageUrl,
          content,
        },
        user.sessionToken,
        user.objectId,
        user.username
      );

      const { code, error } = createData;
      if (code) {
        throw error;
      }
      setLoading(false);

      navigate(`/details/${createData.objectId}`);
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
        <h1 className="form-car-title">Create</h1>
        <form className="form-car-content" onSubmit={onCreate} method="POST">
          <input type="text" id="title" name="title" placeholder="Car Title" onChange={titleHandler} />
          <h5 className="form-error-message">
            {errors.title !== undefined ? errors.title : ''}
          </h5>
          <input type="text" id="url" name="url" placeholder="Image URL" onChange={imageHandler} />
          <h5 className="form-error-message">
            {errors.image !== undefined ? errors.image : ''}
          </h5>
          <textarea
            id="content"
            name="content"
            rows="8"
            cols="70"
            placeholder="Car Information"
            onChange={contentHandler} 
          /> <br /> <br />
          <h5 className="form-error-message">
            {errors.content !== undefined ? errors.content : ''}
          </h5>
          <h5 className="form-error-message">
            {errors.database !== undefined ? errors.database : '' }
          </h5>
          <input type="submit" value="Create" />
        </form>
      </article>
    </>
  );
};

export default isUserGuard(Create);
