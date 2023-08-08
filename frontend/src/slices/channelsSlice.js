/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  defaultChannelId: 1,
  currentChannelId: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannels: channelsAdapter.setAll,
    setDefaultChannel: (state, { payload }) => {
      state.defaultChannelId = payload;
      state.currentChannelId = payload;
    },
    selectCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
    },
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = state.defaultChannelId;
      }
      channelsAdapter.removeOne(state, payload.id);
    },
    renameChannel: channelsAdapter.setOne,
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const channelsActions = channelsSlice.actions;
export default channelsSlice.reducer;
