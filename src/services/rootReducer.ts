import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import feedReducer from './slices/feedSlice';
import constructorReducer from './slices/constructorItemsSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  constructorItems: constructorReducer,
  user: userReducer,
  order: orderReducer
});

export default rootReducer;
