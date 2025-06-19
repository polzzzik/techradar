import { User } from '@/types/User.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  login: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.login = action.payload.login;
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
