import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase();
  // },
});

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messagesReducer);
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
