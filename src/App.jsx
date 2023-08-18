import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoute } from './components';
import { store } from './app/store';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

import VerifyAccount from './pages/VerifyAccount';
import SetupMFA from './pages/SetupMFA';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/*'
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          ></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/portal/register' element={<Register />} />
          <Route path='/portal/register/confirm' element={<VerifyAccount />} />
          <Route path='/mfa/setup' element={<SetupMFA />} />
        </Routes>
      </BrowserRouter>
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
