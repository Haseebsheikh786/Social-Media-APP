import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChats, createChat } from "./chatAPI";
const initialState = {
  status: "idle",
  chats: [],
  chat: "",
};

export const createChatAsync = createAsyncThunk(
  "chat/createChat",
  async (data) => {
    try {
      const response = await createChat(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchChatsAsync = createAsyncThunk(
  "chat/fetchChats",
  async (id) => {
    try {
      const response = await fetchChats(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChatAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createChatAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.chat = action.payload;
      })
      .addCase(fetchChatsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.chats = action.payload;
      });
  },
});

export const selectAllChats = (state) => state.chat.chats;

export default chatSlice.reducer;
