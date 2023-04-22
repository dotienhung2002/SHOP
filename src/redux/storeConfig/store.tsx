import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { rtkQueryErrorLogger } from './../middlewareConfig/middleware'
import commonReducer from "./../reducers/common/commonReducer";
import cartReducer from "./../reducers/common/cartReducer";
// ...
import { authApi } from "@Services/auth.service";
import { cartApi } from "@Services/cart.service";
import { orderApi} from "@Services/order.service";
import { addressApi, menuApi } from "@Services/common.service";
import { productApi } from "@Services/product.service";
export const store = configureStore({
  reducer: {
    common: commonReducer,
    cartChange: cartReducer,
    // counter3: counterSlice.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(menuApi.middleware);
  },
  // Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk-query
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware, rtkQueryErrorLogger)
});

setupListeners(store.dispatch);

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
// setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}
