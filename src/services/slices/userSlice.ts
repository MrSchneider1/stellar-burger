import {
  TRegisterData,
  registerUserApi,
  logoutApi,
  loginUserApi,
  TLoginData,
  updateUserApi,
  getUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    const { refreshToken, accessToken } = response;

    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);

    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    const { refreshToken, accessToken } = response;
    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);

    return response;
  }
);

export const updateUserData = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    await updateUserApi(data);
    const updatedUserData = getUserApi();
    return updatedUserData;
  }
);

export const getUser = createAsyncThunk('user/get', async () => {
  const userData = await getUserApi();
  return userData;
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

interface TUserState {
  isAuthChecked: boolean;
  loginUserRequest: boolean;
  loginUserError: string | null | undefined;
  isAuthenticated: boolean;
  userData: TUser | null;
  logoutUserError: string | null | undefined;
}

const initialState: TUserState = {
  isAuthChecked: false,
  loginUserRequest: false,
  loginUserError: null,
  isAuthenticated: false,
  userData: null,
  logoutUserError: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserError = action.error.message;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loginUserError = action.error.message;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutUserError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutUserError = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
  },
  selectors: {
    getUserDataSelector: (sliceState) => sliceState.userData,
    getUserNameSelector: (sliceState) => sliceState.userData?.name,
    getIsAuthenticatedSelector: (sliceState) => sliceState.isAuthenticated,
    getIsAuthCheckedSelector: (sliceState) => sliceState.isAuthChecked
  }
});

export const {
  getUserDataSelector,
  getUserNameSelector,
  getIsAuthenticatedSelector,
  getIsAuthCheckedSelector
} = userSlice.selectors;
export default userSlice.reducer;
