import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import makeModelReducer from 'app/store/makeModelSlice';
import vehicleReducer from 'app/store/vehicleSlice';

export const store = configureStore({
  reducer: {
    makeModel: makeModelReducer,
    vehicle: vehicleReducer
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
