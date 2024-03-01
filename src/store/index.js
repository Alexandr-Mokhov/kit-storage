import { configureStore } from '@reduxjs/toolkit';
import countSlice from './slices/countSlice';
import loggedInSlice from './slices/loggedInSlice';

export default configureStore({
  reducer: {
    count: countSlice,
    loggedIn: loggedInSlice,
  }
});