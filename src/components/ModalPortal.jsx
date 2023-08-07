import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

ModalPortal.propTypes = {
  children: PropTypes.array.isRequired
};

function ModalPortal({ children }) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    throw new Error('Modal root element not found. Make sure to create an element with id="modal-root" in your HTML.');
  }

  return ReactDOM.createPortal(children, modalRoot);
}

export { ModalPortal };
