import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const fetchChannels = createAsyncThunk(
  'tasks/fetchChannels',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const { data } = await axios.get(routes.dataPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.channels;
  },
);

const channeslAdapter = createEntityAdapter();

const initialState = channeslAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, channeslAdapter.addMany);
  },
});

export const channelsSelectors = channeslAdapter.getSelectors((state) => state.channelsReducer);

export default channelsSlice.reducer;
