import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const fetchMessages = createAsyncThunk(
  'tasks/fetchMessages',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const { data } = await axios.get(routes.dataPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.messages;
  },
);

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, messagesAdapter.addMany);
  },
});

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messagesReducer);

export default messagesSlice.reducer;
