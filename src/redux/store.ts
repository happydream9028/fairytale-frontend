import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import { dashboardApi } from "./appQuery";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(dashboardApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
