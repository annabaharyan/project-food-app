import { configureStore } from "@reduxjs/toolkit";
import { cardApi } from "./cardApi";

export const store = configureStore({
  reducer: {
    [cardApi.reducerPath]: cardApi.reducer,
  },
  middleware: (getDefaultMidleware) =>
    getDefaultMidleware().concat(cardApi.middleware),
});
