import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoute } from './components';
import { store } from './app/store';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Stores from './pages/Stores';
import Customers from './pages/Customers';
import VerifyAccount from './pages/VerifyAccount';
import SetupMFA from './pages/SetupMFA';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Stores /> },
      { path: 'customers', element: <Customers /> }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/portal/register',
    element: <Register />
  },
  {
    path: '/portal/register/confirm',
    element: <VerifyAccount />
  },
  {
    path: '/mfa/setup',
    element: <SetupMFA />
  }
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        closeOnClick={false}
        draggable={false}
        autoClose={3000}
      />
    </Provider>
  );
};

export default App;
