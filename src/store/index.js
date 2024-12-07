import { configureStore } from '@reduxjs/toolkit';
import userInfo from './slices/userInfo.slices';
import storeReducer from './slices/stores.slices';

export default configureStore({
  reducer: {
    userInfo,
    store: storeReducer,
  },
});
