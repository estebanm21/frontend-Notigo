import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfo.slices";

export default configureStore({
  reducer: {
    userInfo,
  },
});
