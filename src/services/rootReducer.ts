import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice/ingredientsSlice';
import feedReducer from './slices/feedSlice/feedSlice';
import constructorReducer from './slices/constructorItemsSlice/constructorItemsSlice';
import userReducer from './slices/userSlice/userSlice';
import orderReducer from './slices/orderSlice/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  constructorItems: constructorReducer,
  user: userReducer,
  order: orderReducer
});

export default rootReducer;
