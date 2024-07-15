import { Outlet } from 'react-router-dom';
import { AppHeader } from '../app-header';

export const AppLayout = () => (
  <>
    <AppHeader />
    <Outlet />
  </>
);
