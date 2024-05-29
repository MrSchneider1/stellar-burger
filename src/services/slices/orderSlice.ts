import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderSliceState {
  order: TOrder | null;
  name: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderSliceState = {
  order: null,
  name: null,
  loading: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'burger/order',
  async (data: string[]) => orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.order = null;
      state.name = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.order = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
  selectors: {
    getOrderSelector: (sliceState) => sliceState.order,
    getLoadingOrderSelector: (sliceState) => sliceState.loading
  }
});

export const { getOrderSelector, getLoadingOrderSelector } =
  orderSlice.selectors;
export const { clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;
