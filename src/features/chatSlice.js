import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;

const initialState = {
  status: "",
  error: "",
  conversation: [],
  activeConversation: [],
  notification: [],
};

export const getConversation = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CONVERSATION_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.conversation = action.payload;
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;
export default chatSlice.reducer;