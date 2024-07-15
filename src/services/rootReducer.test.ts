import { expect, test } from '@jest/globals';
import rootReducer from './rootReducer';

test('тест инициализации корневого редюсера', () => {
  const initialState = rootReducer(undefined, { type: '@@INIT' });
  const expectedState = {
    ingredients: {
      data: [],
      loading: false,
      error: null
    },
    feed: {
      orders: [],
      orderModalData: [],
      profileOrders: [],
      total: null,
      totalToday: null,
      loading: false,
      error: null
    },
    constructorItems: {
      constructorItems: {
        bun: null,
        ingredients: []
      }
    },
    user: {
      isAuthChecked: false,
      loginUserRequest: false,
      loginUserError: null,
      isAuthenticated: false,
      userData: null,
      logoutUserError: null
    },
    order: {
      order: null,
      name: null,
      loading: false,
      error: null
    }
  };
  expect(initialState).toEqual(expectedState);
});
