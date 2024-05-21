import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  clearOrderData,
  getLoadingOrderSelector,
  getOrderSelector,
  orderBurger
} from '../../services/slices/orderSlice';
import {
  clearIngredients,
  getConstructorItemsSelector
} from '../../services/slices/constructorItemsSlice';
import { getUserDataSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItemsSelector);
  const user = useSelector(getUserDataSelector);
  const orderRequest = useSelector(getLoadingOrderSelector);
  const orderModalData = useSelector(getOrderSelector);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemIds: string[] = [
    ...constructorItems.ingredients.map((element) => element._id),
    constructorItems.bun?._id
  ].filter((id): id is string => id !== undefined);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }
    dispatch(orderBurger(itemIds));
  };
  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
