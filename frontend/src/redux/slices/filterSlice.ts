import { FilterOptions } from '@/types/FilterOption.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FilterOptions = {};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterOptions>) {
      Object.assign(state, action.payload);
    },
    setFilterNameParam(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export const { setFilter, setFilterNameParam } = filterSlice.actions;

export default filterSlice.reducer;
