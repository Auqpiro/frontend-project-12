import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channeslAdapter = createEntityAdapter();

const initialState = channeslAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannels: channeslAdapter.setAll,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase();
  // },
});

export const channelsSelectors = channeslAdapter.getSelectors((state) => state.channelsReducer);
export const channelsActions = channelsSlice.actions;
export default channelsSlice.reducer;
