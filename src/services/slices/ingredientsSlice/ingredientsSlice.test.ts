import { expect, test, describe } from '@jest/globals';
import ingredientsSliceReducer, { initialState, getIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
    {
      _id: "1",
      name: "Beef Patty",
      type: "meat",
      proteins: 21,
      fat: 17,
      carbohydrates: 0,
      calories: 250,
      price: 5,
      image: "https://example.com/images/beef_patty.png",
      image_large: "https://example.com/images/beef_patty_large.png",
      image_mobile: "https://example.com/images/beef_patty_mobile.png",
    },
    {
      _id: "2",
      name: "Lettuce",
      type: "vegetable",
      proteins: 1,
      fat: 0.1,
      carbohydrates: 2,
      calories: 15,
      price: 0.5,
      image: "https://example.com/images/lettuce.png",
      image_large: "https://example.com/images/lettuce_large.png",
      image_mobile: "https://example.com/images/lettuce_mobile.png",
    }
  ];

describe('ingredients reducer', () => {
    test('initializes correctly', () => {
        const state = ingredientsSliceReducer(undefined, { type: '' });
        expect(state).toEqual(initialState);
      });

    test('test getIngredients fulfilled', () => {
        const action = { type: getIngredients.fulfilled.type, payload: mockIngredients };
    
        const state = ingredientsSliceReducer(initialState, action);
    
        expect(state).toEqual({
          ...initialState,
          data: mockIngredients,
          loading: false
        });
      });
    
      test('test getIngredients pending', () => {
        const action = { type: getIngredients.pending.type };
    
        const state = ingredientsSliceReducer(initialState, action);
    
        expect(state).toEqual({
          ...initialState,
          loading: true
        });
      });
    
      test('test getIngredients rejected', () => {
        const action = { type: getIngredients.rejected.type, error: {message: 'failed to fetch data'} };
    
        const state = ingredientsSliceReducer(initialState, action);
    
        expect(state.error).not.toEqual(null);
        expect(state.error).toEqual('failed to fetch data');
      });
});
