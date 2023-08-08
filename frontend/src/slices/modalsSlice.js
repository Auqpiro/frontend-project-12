/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    item: null,
  },
  reducers: {
    hideModal: (state) => {
      state.type = null;
      state.item = null;
    },
    showModal: (state, { payload }) => {
      const { type, item } = payload;
      state.type = type;
      state.item = item;
    },
  },
});

export const { hideModal, showModal } = modalsSlice.actions;
export default modalsSlice.reducer;
