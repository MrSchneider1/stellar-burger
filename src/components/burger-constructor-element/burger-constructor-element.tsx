import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItemsIngredientsSelector,
  replaceIngredients
} from '../../services/slices/constructorItemsSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const constructorIngredients = useSelector(
      getConstructorItemsIngredientsSelector
    );
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      const updatedIngredients = [...constructorIngredients];
      const currentItem = updatedIngredients[index];
      updatedIngredients[index] = updatedIngredients[index + 1];
      updatedIngredients[index + 1] = currentItem;
      dispatch(replaceIngredients(updatedIngredients));
    };

    const handleMoveUp = () => {
      const updatedIngredients = [...constructorIngredients];
      const currentItem = updatedIngredients[index];
      updatedIngredients[index] = updatedIngredients[index - 1];
      updatedIngredients[index - 1] = currentItem;
      dispatch(replaceIngredients(updatedIngredients));
    };

    const handleClose = () => {
      const updatedIngredients = [...constructorIngredients];
      updatedIngredients.splice(index, 1);
      dispatch(replaceIngredients(updatedIngredients));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
