import { expect, test, describe } from '@jest/globals';
import userSliceReducer, {
  initialState,
  registerUser,
  loginUser,
  updateUserData,
  getUser,
  logoutUser
} from './userSlice';
import { TUser } from '@utils-types';

const mockUserData: TUser = {
  email: 'example@gmail.com',
  name: 'Alexander'
};

const mockUpdatedUserData: TUser = {
  email: 'example@gmail.com',
  name: 'Alex'
};

describe('user reducer', () => {
  test('initializes correctly', () => {
    const state = userSliceReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('test registerUser fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUserData }
    };

    const state = userSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      userData: mockUserData,
      isAuthenticated: true,
      isAuthChecked: true
    });
  });

  test('test registerUser pending', () => {
    const action = { type: registerUser.pending.type };

    const state = userSliceReducer(initialState, action);

    expect(state.loginUserRequest).toEqual(true);
  });

  test('test registerUser rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'failed to fetch data' }
    };

    const state = userSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loginUserError: 'failed to fetch data',
      isAuthChecked: true
    });
  });

  test('test loginUser fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUserData }
    };

    const state = userSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      userData: mockUserData,
      isAuthenticated: true,
      isAuthChecked: true
    });
  });

  test('test loginUser pending', () => {
    const action = { type: loginUser.pending.type };

    const state = userSliceReducer(initialState, action);

    expect(state.loginUserRequest).toEqual(true);
  });

  test('test loginUser rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'failed to fetch data' }
    };

    const state = userSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loginUserError: 'failed to fetch data',
      isAuthChecked: true
    });
  });

  test('test updateUserData fulfilled', () => {
    const action = {
      type: updateUserData.fulfilled.type,
      payload: { user: mockUpdatedUserData }
    };

    const state = userSliceReducer(
      { ...initialState, userData: mockUserData },
      action
    );

    expect(state).toEqual({
      ...initialState,
      userData: mockUpdatedUserData,
      isAuthenticated: true
    });
  });

  test('test updateUserData rejected', () => {
    const action = {
      type: updateUserData.rejected.type,
      error: { message: 'failed to fetch data' }
    };

    const state = userSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loginUserError: 'failed to fetch data'
    });
  });

  test('test getUser fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: mockUserData }
    };

    const state = userSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      userData: mockUserData,
      isAuthenticated: true,
      isAuthChecked: true
    });
  });

  test('test getUser rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'failed to fetch data' }
    };

    const state = userSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loginUserError: 'failed to fetch data',
      isAuthChecked: true
    });
  });

  test('test logoutUser fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };

    const state = userSliceReducer(
      { ...initialState, userData: mockUserData },
      action
    );

    expect(state).toEqual({
      ...initialState,
      userData: null,
      isAuthenticated: false,
      isAuthChecked: true
    });
  });

  test('test logoutUser rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'failed to fetch data' }
    };

    const state = userSliceReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      logoutUserError: 'failed to fetch data'
    });
  });
});
