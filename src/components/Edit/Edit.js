const Edit = () => {
  return (
      <article className="form-car">
        <h1 className="form-car-title">Edit</h1>
        <form className="form-car-content">
          <input type="text" id="title" name="title" placeholder="Edit Car Title" />
          <input type="text" id="url" name="url" placeholder="Edit Image URL" />
          <textarea id="content" name="content" rows="8" cols="70" placeholder="Edit Car Information" />
          <input type="submit" value="Edit" />
        </form>
      </article>
  );
};

export default Edit;
