import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import dataRegisterReducer from "./registerSlice";
import SideBar from "./sideBarSlice";
import { api } from "./services/api";
import dataRegister2Reducer from "./register2Slice";
import { listenerMiddleware } from "@/features/user/midleware/auth";
import counterReducer from "@/widgets/header/api/ProductCounter";
import priceReducer from "@/widgets/finance/api/ProductPrice";
import productReducer from "@/pages/ProductCard/api/ProductCard";
import userReducer from "@/features/user/userData/userDataSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    step1: dataRegisterReducer,
    SideBar,
    step2: dataRegister2Reducer,
    counter: counterReducer,
    price: priceReducer,
    product: productReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
