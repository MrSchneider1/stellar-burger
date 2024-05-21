import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import {
  getFeed,
  getFeedSelector,
  getFeedLoadingSelector,
  getTotalSelector
} from '../../services/slices/feedSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeedSelector);
  const total = useSelector(getTotalSelector);
  const isLoading = useSelector(getFeedLoadingSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const handleGetFeeds = useCallback(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
