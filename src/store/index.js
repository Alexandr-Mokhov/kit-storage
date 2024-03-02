import { configureStore } from '@reduxjs/toolkit';
import countSlice from './slices/countSlice';
import loggedInSlice from './slices/loggedInSlice';
import allFilesSlice from './slices/allFilesSlice';

export default configureStore({
  reducer: {
    count: countSlice,
    loggedIn: loggedInSlice,
    allFiles: allFilesSlice,
  }
});