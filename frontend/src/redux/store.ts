// redux/store.ts
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import sortReducer from './slices/sortSlice';
import filterReducer from './slices/filterSlice';
import { technologiestApi } from './api/technologies.api';
import { userApi } from './api/user.api';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    filter: filterReducer,
    user: userReducer,
    [technologiestApi.reducerPath]: technologiestApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(technologiestApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
