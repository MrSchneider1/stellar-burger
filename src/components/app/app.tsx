import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppLayout, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getUser } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userToken = getCookie('accessToken');

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const onCloseProfileOrder = () => {
    navigate(backgroundLocation);
    
  }

  return (
    <>
      <div className={styles.app}>
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<ConstructorPage />} />
            <Route path='feed' element={<Feed />} />
            <Route path='feed/:number' element={<OrderInfo />} />
            <Route
              path='login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='profile'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path='orders'>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <ProfileOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=':number'
                  element={
                    <ProtectedRoute>
                      <OrderInfo />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title='' onClose={() => navigate(backgroundLocation)}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Детали ингредиента'
                  onClose={() => navigate(backgroundLocation)}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal title='' onClose={() => navigate(backgroundLocation)}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
