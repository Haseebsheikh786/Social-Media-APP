import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts, fetchPostByID } from "./postAPI";

const initialState = {
  posts: [],
  comments: [],
  Userposts: [],
  status: "idle",
};

export const fetchAllPostsAsync = createAsyncThunk(
  "post/fetchAllPosts",
  async () => {
    const response = await fetchAllPosts();
    return response.data;
  }
);
export const fetchPostByIDAsync = createAsyncThunk(
  "post/fetchPostByID",
  async (id) => {
    const response = await fetchPostByID(id);
    return response.data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload;
      })
      .addCase(fetchPostByIDAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostByIDAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Userposts = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.post.posts;
export const selectPostByID = (state) => state.post.Userposts;

export const { createPost } = postSlice.actions;

export default postSlice.reducer;
