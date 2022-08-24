import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import qaSlice from '../features/qa/qaSlice';

export const store = configureStore({
    reducer: {
        qa: qaSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
