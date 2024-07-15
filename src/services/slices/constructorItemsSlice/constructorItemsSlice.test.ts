import { expect, test, describe } from '@jest/globals';
import constructorItemsSliceReducer, {
  initialState
} from './constructorItemsSlice';
import { TConstructorIngredient } from '@utils-types';

const mockBunIngredient: TConstructorIngredient = {
  _id: '1',
  name: 'SpaceBun',
  type: 'bun',
  proteins: 100,
  fat: 100,
  carbohydrates: 100,
  calories: 300,
  price: 100,
  image: 'bun1.png',
  image_large: 'bun1_large.png',
  image_mobile: 'bun1_mob.png',
  id: '123'
};

const mockSauceIngredient: TConstructorIngredient = {
  _id: '1',
  name: 'SpaceSauce',
  type: 'sauce',
  proteins: 100,
  fat: 100,
  carbohydrates: 100,
  calories: 300,
  price: 100,
  image: 'bun1.png',
  image_large: 'bun1_large.png',
  image_mobile: 'bun1_mob.png',
  id: '123'
};

const newIngredients: TConstructorIngredient[] = [
  {
    _id: '12',
    name: 'SpaceMeat',
    type: 'sauce',
    proteins: 100,
    fat: 100,
    carbohydrates: 100,
    calories: 300,
    price: 100,
    image: 'image.png',
    image_large: 'large.png',
    image_mobile: 'mob.png',
    id: '111'
  },
  {
    _id: '20',
    name: 'SpaceMeatball',
    type: 'main',
    proteins: 100,
    fat: 100,
    carbohydrates: 100,
    calories: 300,
    price: 100,
    image: 'image.png',
    image_large: 'large.png',
    image_mobile: 'mob.png',
    id: '122'
  },
  {
    _id: '14',
    name: 'Tomato',
    type: 'main',
    proteins: 100,
    fat: 100,
    carbohydrates: 100,
    calories: 300,
    price: 100,
    image: 'image.png',
    image_large: 'large.png',
    image_mobile: 'mob.png',
    id: '133'
  }
];

describe('constructor reducer', () => {
  test('initializes correctly', () => {
    const state = constructorItemsSliceReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('test addIngredient: add buns', () => {
    const action = {
      type: 'constructorItems/addIngredient',
      payload: mockBunIngredient
    };

    const state = constructorItemsSliceReducer(initialState, action);

    expect(state.constructorItems.bun).toEqual(mockBunIngredient);
  });

  test('test addIngredient: add main or sauce ingredient', () => {
    const action = {
      type: 'constructorItems/addIngredient',
      payload: mockSauceIngredient
    };

    const state = constructorItemsSliceReducer(initialState, action);

    expect(state.constructorItems.ingredients[0]).toEqual(mockSauceIngredient);
  });

  test('test replaceIngredients', () => {
    const prevState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [mockSauceIngredient]
      }
    };

    const action = {
      type: 'constructorItems/replaceIngredients',
      payload: newIngredients
    };

    const state = constructorItemsSliceReducer(prevState, action);
    expect(state.constructorItems.ingredients).toEqual(newIngredients);
  });

  test('test clearIngredients', () => {
    const prevState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [mockSauceIngredient]
      }
    };
    const action = { type: 'constructorItems/clearIngredients' };

    const state = constructorItemsSliceReducer(prevState, action);
    expect(state.constructorItems.ingredients).toEqual([]);
  });
});
