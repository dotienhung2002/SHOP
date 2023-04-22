import { withPayloadType } from "@Redux/storeConfig/store";
import { createAction, createReducer } from "@reduxjs/toolkit";
// interface Menu {
//     menu:Object[],
// }
const initialState = {
  amount: 0,
};

export const increaseCart = createAction("increase",withPayloadType<number>());
export const decreaseCart = createAction("decrease",withPayloadType<number>());
export const initialCart = createAction("initialCart",withPayloadType<number>());
const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increaseCart, (state, action) => {
      state.amount += action.payload;
    })
    .addCase(decreaseCart, (state, action) => {
      state.amount -=  action.payload;
    })
    .addCase(initialCart, (state, action) => {
      state.amount=action.payload;
    })
});
export default cartReducer;
