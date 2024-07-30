import { configureStore } from "@reduxjs/toolkit";
import { reducer as reducerUser } from "../service/Login-Register/Login_Register";
import { reducer as reducerPost } from "../service/Login-Register/Post";

export const store = configureStore({
  reducer: {
    users: reducerUser,
    post: reducerPost,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
