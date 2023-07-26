import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channeslAdapter = createEntityAdapter();

const initialState = channeslAdapter.getInitialState({
  defaultChannelId: 1,
  currentChannelId: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannels: channeslAdapter.setAll,
    setDefaultChannel: (state, { payload }) => {
      state.defaultChannelId = payload;
      state.currentChannelId = payload;
    },
    selectCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      channeslAdapter.addOne(state, payload);
    },
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = state.defaultChannelId;
      }
      channeslAdapter.removeOne(state, payload.id);
    },
    renameChannel: channeslAdapter.setOne,
  },
});

export const channelsSelectors = channeslAdapter.getSelectors((state) => state.channelsReducer);
export const channelsActions = channelsSlice.actions;
export default channelsSlice.reducer;
