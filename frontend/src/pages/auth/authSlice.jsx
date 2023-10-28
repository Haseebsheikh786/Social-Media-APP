import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login, logout } from "./authAPI";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
};

export const login = createAsyncThunk("auth/login", async ({ user, alert }) => {
  try {
    return await Login(user);
  } catch (error) {
    alert.error(error.response.data.error);
  }
});

export const Logout = createAsyncThunk("auth/logout", async () => {
  await logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
