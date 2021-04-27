import './Modal.scss';

const Modal = ({ showModal, close, children, deleteItem, slug, text }) => {
  return (
    <>
      <div className={showModal ? 'display' : 'modal'}>
        <div
          className='modal__wrapper'
          style={{
            opacity: showModal ? '1' : '0',
          }}
        >
          <div className='modal__header'>
            <h3 className='modal__title'>{text}</h3>
          </div>
          <div className='modal__body'>
            <p>{children}</p>
          </div>
          <div className='modal__footer'>
            <button className='modal__btn-cancel' onClick={close}>
              CANCEL
            </button>
            <button
              className='modal__btn-delete'
              onClick={() => deleteItem(slug)}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
