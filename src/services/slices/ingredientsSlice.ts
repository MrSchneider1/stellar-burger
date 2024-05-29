import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsSliceState {
  data: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsSliceState = {
  data: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
  selectors: {
    getIngredientsSelector: (sliceState) => sliceState.data,
    getLoadingIngredientsSelector: (sliceState) => sliceState.loading
  }
});

export const { getIngredientsSelector, getLoadingIngredientsSelector } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
