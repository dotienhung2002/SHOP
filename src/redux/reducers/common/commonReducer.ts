import { createAction, createReducer } from "@reduxjs/toolkit";
// interface Menu {
//     menu:Object[],
// }
const initialState = {
  menu: {
    classify: [],
    category: [],
    brand: [],
  },
};
export const addMenu = createAction("333");
const commonReducer = createReducer(initialState, (builder) => {
  builder.addCase(addMenu, (state, action) => {
    state.menu.brand.push();
  });
});
export default commonReducer;
