import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const ModalPortal = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    throw new Error('Modal root element not found. Make sure to create an element with id="modal-root" in your HTML.');
  }

  return ReactDOM.createPortal(children, modalRoot);
};

ModalPortal.propTypes = {
  children: PropTypes.array.isRequired
};

export { ModalPortal };
