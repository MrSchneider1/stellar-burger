import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getIngredientsSelector,
  getLoadingIngredientsSelector
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = useSelector(getLoadingIngredientsSelector);
  const ingredients = useSelector(getIngredientsSelector);
  const params = useParams();
  const ingredientData = ingredients.find(
    (element) => element._id === params.id!
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <IngredientDetailsUI ingredientData={ingredientData} />
      )}
    </>
  );
};
