import { getSession } from '../utils/utils';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired
};

function ProtectedRoute({ children }) {
  const session = getSession();

  if (!session) return <Navigate to={'/login'} replace />;

  return children;
}

export { ProtectedRoute };
