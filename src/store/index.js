import { configureStore } from '@reduxjs/toolkit';
import countSlice from './slices/countSlice';
import loggedInSlice from './slices/loggedInSlice';
import allFilesSlice from './slices/allFilesSlice';
import isLoadSlice from './slices/isLoadSlice';

export default configureStore({
  reducer: {
    count: countSlice,
    loggedIn: loggedInSlice,
    allFiles: allFilesSlice,
    isLoad: isLoadSlice,
  }
});