import './ModalDialog.css';

const ModalDialog = ({ show, onClose, onSave }) => {
  return (
    <>
      {show ? (
        <article className="modal-container">
          <h1 className="modal-container-title">Are you sure you want to delete it?</h1>
          <hr />
          <article className="buttons-container">
            <button className="modal-container-button cancel" onClick={onClose}>Cancel</button>
            <button className="modal-container-button delete" onClick={onSave}>Delete</button>
          </article>
        </article>
      ) : null}
    </>
  );
};

export default ModalDialog;
