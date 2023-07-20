import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import currentChannelReducer from './currentChannelSlice.js';

const store = configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    currentChannelReducer,
  },
});

export default store;