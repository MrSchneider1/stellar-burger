import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeed,
  getFeedSelector,
  getOrderByNumber,
  getOrderModalDataSelector
} from '../../services/slices/feedSlice';
import { getIngredients, getIngredientsSelector } from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const params = useParams();
  const id = Number(params.number);
  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);
  const data = useSelector(getFeedSelector);
  const dataModal: TOrder = useSelector(getOrderModalDataSelector);

  useEffect(() => {
    if (id) {
      const order: TOrder | undefined = data.find((o) => o.number === id);
      if (order) { 
        setOrderData(order);
      } else {
        dispatch(getOrderByNumber(id));
        setOrderData(dataModal);
        }
      }
  }, [dispatch, dataModal, id]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
