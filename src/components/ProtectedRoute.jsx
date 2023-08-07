import { useLocalStorage } from '../utils/utils';
import { keyStorage } from '../constraint/constraint';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired
};

function ProtectedRoute({ children }) {
  const [user] = useLocalStorage(keyStorage, null);

  if (!user) return <Navigate to={'/login'} replace />;

  return children;
}

export { ProtectedRoute };
