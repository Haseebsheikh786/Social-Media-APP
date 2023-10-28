import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAllUsers, FetchAllFriends, FetchLogInUser } from "./userAPI";

const initialState = {
  userInfo: null,
  users: [],
  userFriends: [],
  isLoading: false,
};

export const FetchLogInUserAsync = createAsyncThunk(
  "user/FetchLogInUser",
  async (thunkAPI) => {
    try {
      return await FetchLogInUser();
    } catch (error) {
      alert(error.response.data.error);
    }
  }
);

export const FetchAllUsersAsync = createAsyncThunk(
  "user/FetchAllUsers",
  async (thunkAPI) => {
    try {
      return await FetchAllUsers();
    } catch (error) {
      console.log(error);
    }
  }
);
export const FetchAllFriendAsync = createAsyncThunk(
  "user/FetchAllFriends",
  async (thunkAPI) => {
    try {
      return await FetchAllFriends();
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchLogInUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchLogInUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(FetchAllUsersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchAllUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(FetchAllFriendAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchAllFriendAsync.fulfilled, (state, action) => {
        state.userFriends = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.user.userInfo;
export const selectAllUsers = (state) => state.user.users;
export const selectAllFriends = (state) => state.user.userFriends;
export default userSlice.reducer;
