import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Stores from './pages/Stores';
import Customers from './pages/Customers';
import { ProtectedRoute } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyAccount from './pages/VerifyAccount';
import SetupMFA from './pages/SetupMFA';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
