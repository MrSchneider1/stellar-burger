import { ProfileOrdersUI } from '@ui-pages';
import { TIngredient, TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getProfileOrdersSelector
} from '../../services/slices/feedSlice';
import { getIngredients, getIngredientsSelector } from '../../services/slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getProfileOrdersSelector);
  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);


  useEffect(() => {
    if(!ingredients.length) {
      dispatch(getIngredients());
      console.log(1)
    }
    console.log(ingredients, orders)
    dispatch(getOrders());

  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
