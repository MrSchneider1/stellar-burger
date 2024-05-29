import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface FeedSliceState {
  orders: TOrder[];
  orderModalData: TOrder[];
  profileOrders: TOrder[];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedSliceState = {
  orders: [],
  orderModalData: [],
  profileOrders: [],
  total: null,
  totalToday: null,
  loading: false,
  error: null
};

export const getFeed = createAsyncThunk('feed/getAll', async () =>
  getFeedsApi()
);

export const getOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (data: number) => getOrderByNumberApi(data)
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.profileOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.orders;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
  selectors: {
    getFeedLoadingSelector: (sliceState) => sliceState.loading,
    getFeedSelector: (sliceState) => sliceState.orders,
    getProfileOrdersSelector: (sliceState) => sliceState.profileOrders,
    getTotalSelector: (sliceState) => sliceState.total,
    getTotalTodaySelector: (sliceState) => sliceState.totalToday,
    getOrderModalDataSelector: (sliceState) => sliceState.orderModalData[0]
  }
});

export const {
  getFeedLoadingSelector,
  getFeedSelector,
  getProfileOrdersSelector,
  getTotalSelector,
  getTotalTodaySelector,
  getOrderModalDataSelector
} = feedSlice.selectors;
export default feedSlice.reducer;
