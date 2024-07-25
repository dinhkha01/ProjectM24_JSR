// import { reducer } from "./reducers";

import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../service/Login-Register/Login_Register";

export const store = configureStore({
  reducer: {
    users: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
