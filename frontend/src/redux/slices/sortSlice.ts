import { SortOption } from '@/types/SortOption.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SortOption = {
  param: '',
  order: 'asc',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortOption>) {
      state.param = action.payload.param;
      state.order = action.payload.order;
    },
  },
});

export const { setSort } = sortSlice.actions;

export default sortSlice.reducer;
