import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as carService from '../../services/carService';
import Loading from '../Loading';

const Create = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onCreate = async (e) => {
    e.preventDefault();

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
      setLoading(false);

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
    <>
    {loading ? <Loading /> : '' }
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
    </>
  );
};

export default Create;
