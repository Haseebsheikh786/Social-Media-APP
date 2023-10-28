import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../pages/auth/authSlice";
import userSlice from "../pages/User/userSlice";
import postSlice from "../pages/Post/postSlice";
import chatSlice from "../pages/chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    post:postSlice,
    chat:chatSlice
  },
});
