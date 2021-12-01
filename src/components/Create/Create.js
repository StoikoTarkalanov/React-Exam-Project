import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as carService from '../../services/carService';

const Create = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onCreate = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let title = formData.get('title');
    let imageUrl = formData.get('url');
    let content = formData.get('content');

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

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="form-car">
      <h1 className="form-car-title">Create</h1>
      <form className="form-car-content" onSubmit={onCreate} method="POST">
        <input type="text" id="title" name="title" placeholder="Car Title" />
        <input type="text" id="url" name="url" placeholder="Image Url" />
        <textarea
          id="content"
          name="content"
          rows="8"
          cols="70"
          placeholder="Car Information"
        />
        <input type="submit" value="Create" />
      </form>
    </article>
  );
};

export default Create;
