import { expect, test, describe } from '@jest/globals';
import orderSliceReducer, { initialState, orderBurger, clearOrderData } from './orderSlice';
import { TNewOrderResponse } from '@api';

const mockOrderData: TNewOrderResponse = {
    success: true,
    order: {
        _id: 'order1',
        status: 'done',
        name: 'Order 1',
        createdAt: '2024-07-10T10:00:00.000Z',
        updatedAt: '2024-07-10T12:00:00.000Z',
        number: 1,
        ingredients: ['ingredient1', 'ingredient2']
      },
    name: 'Alexander'
}

describe('ingredients reducer', () => {
    test('initializes correctly', () => {
        const state = orderSliceReducer(undefined, { type: '' });
        expect(state).toEqual(initialState);
      });

    test('test getIngredients fulfilled', () => {
        const action = { type: orderBurger.fulfilled.type, payload: mockOrderData };
    
        const state = orderSliceReducer(initialState, action);
    
        expect(state).toEqual({
          ...initialState,
          name: mockOrderData.name,
          order: mockOrderData.order,
          loading: false
        });
      });
    
      test('test getIngredients pending', () => {
        const action = { type: orderBurger.pending.type };
    
        const state = orderSliceReducer(initialState, action);
    
        expect(state).toEqual({
          ...initialState,
          loading: true
        });
      });
    
      test('test getIngredients rejected', () => {
        const action = { type: orderBurger.rejected.type, error: {message: 'failed to fetch data'} };
    
        const state = orderSliceReducer(initialState, action);
    
        expect(state.error).not.toEqual(null);
        expect(state.error).toEqual('failed to fetch data');
      });

      test('test clearOrderData', () => {
        const action = { type: 'order/clearOrderData' };
        const state = orderSliceReducer(initialState, action);
        expect(state).toEqual({ 
            ...initialState, 
            order: null, 
            name: null
        });
      })
});