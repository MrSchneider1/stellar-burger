import { expect, test, describe } from '@jest/globals';
import feedSliceReducer, {
  initialState,
  getFeed,
  getOrders,
  getOrderByNumber
} from './feedSlice';
import { TFeedsResponse } from '@api';
import { TOrder } from '@utils-types';

const mockFeed: TFeedsResponse = {
  success: true,
  orders: [
    {
      _id: 'order1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-07-10T10:00:00.000Z',
      updatedAt: '2024-07-10T12:00:00.000Z',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    },
    {
      _id: 'order2',
      status: 'pending',
      name: 'Order 2',
      createdAt: '2024-07-10T11:00:00.000Z',
      updatedAt: '2024-07-10T13:00:00.000Z',
      number: 2,
      ingredients: ['ingredient3', 'ingredient4']
    }
  ],
  total: 100,
  totalToday: 5
};

const mockProfileOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Burger',
    createdAt: '2023-07-01T12:00:00Z',
    updatedAt: '2023-07-01T12:30:00Z',
    number: 1001,
    ingredients: ['bun', 'patty', 'lettuce', 'tomato', 'cheese']
  },
  {
    _id: '2',
    status: 'preparing',
    name: 'Pizza',
    createdAt: '2023-07-01T12:10:00Z',
    updatedAt: '2023-07-01T12:40:00Z',
    number: 1002,
    ingredients: ['dough', 'tomato sauce', 'cheese', 'pepperoni', 'olives']
  }
];

describe('feed reducer', () => {
  test('initializes correctly', () => {
    const state = feedSliceReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('test getFeed fulfilled', () => {
    const action = { type: getFeed.fulfilled.type, payload: mockFeed };

    const state = feedSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orders: mockFeed.orders,
      total: mockFeed.total,
      totalToday: mockFeed.totalToday,
      loading: false
    });
  });

  test('test getFeed pending', () => {
    const action = { type: getFeed.pending.type };

    const state = feedSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('test getFeed rejected', () => {
    const action = {
      type: getFeed.rejected.type,
      error: { message: 'failed to fetch data' }
    };

    const state = feedSliceReducer(initialState, action);

    expect(state.error).not.toEqual(null);
    expect(state.error).toEqual('failed to fetch data');
  });

  test('test getOrders fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockProfileOrders
    };

    const state = feedSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      profileOrders: mockProfileOrders,
      loading: false
    });
  });

  test('test getOrders pending', () => {
    const action = { type: getOrders.pending.type };

    const state = feedSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('test getOrders rejected', () => {
    const action = {
      type: getOrders.rejected.type,
      error: { message: 'failed to fetch data' }
    };

    const state = feedSliceReducer(initialState, action);

    expect(state.error).not.toEqual(null);
    expect(state.error).toEqual('failed to fetch data');
  });

  test('test getOrderByNumber fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockProfileOrders[0]] }
    };

    const state = feedSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orderModalData: [mockProfileOrders[0]],
      loading: false
    });
  });

  test('test getOrderByNumber pending', () => {
    const action = { type: getOrderByNumber.pending.type };

    const state = feedSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('test getOrderByNumber rejected', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'failed to fetch data' }
    };

    const state = feedSliceReducer(initialState, action);

    expect(state.error).not.toEqual(null);
    expect(state.error).toEqual('failed to fetch data');
  });
});
