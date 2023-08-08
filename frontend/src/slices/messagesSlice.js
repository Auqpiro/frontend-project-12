import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const removedMessages = Object.values(state.entities)
        .filter(({ channelId }) => channelId === payload.id)
        .map(({ id }) => id);
      messagesAdapter.removeMany(state, removedMessages);
    });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
