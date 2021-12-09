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
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const onCreate = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let title = formData.get('title');
    let imageUrl = formData.get('url');
    let content = formData.get('content');

    setLoading(true);
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
      setLoading(false);

      navigate(`/details/${createData.objectId}`);
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
          <span className="form-error-message">
            {errors.title !== undefined ? errors.title : ''}
          </span>
          <input type="text" id="url" name="url" placeholder="Image URL" onChange={imageHandler} />
          <span className="form-error-message">
            {errors.image !== undefined ? errors.image : ''}
          </span>
          <textarea
            id="content"
            name="content"
            rows="8"
            cols="70"
            placeholder="Car Information"
            onChange={contentHandler} 
          /> <br /> <br />
          <span className="form-error-message">
            {errors.content !== undefined ? errors.content : ''}
          </span>
          <input type="submit" value="Create" />
        </form>
      </article>
    </>
  );
};

export default isUserGuard(Create);
