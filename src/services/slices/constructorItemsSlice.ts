import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface ConstructorItemsSliceState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: ConstructorItemsSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    replaceIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.constructorItems.ingredients = action.payload;
    },
    clearIngredients: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    getConstructorItemsSelector: (sliceState) => sliceState.constructorItems,
    getConstructorItemsIngredientsSelector: (sliceState) =>
      sliceState.constructorItems.ingredients
  }
});

export const {
  getConstructorItemsSelector,
  getConstructorItemsIngredientsSelector
} = constructorItemsSlice.selectors;
export const { addIngredient, replaceIngredients, clearIngredients } =
  constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
