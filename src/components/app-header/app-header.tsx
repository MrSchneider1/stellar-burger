import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserNameSelector } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserNameSelector);

  return <AppHeaderUI userName={userName ? userName : ''} />;
};
