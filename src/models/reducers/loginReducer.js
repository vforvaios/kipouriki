import { createReducer } from "@reduxjs/toolkit";
import { setLoginUser } from "../actions/loginActions";

const initialState = {
  user: null,
};
const loginReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoginUser, (state, action) => ({
    ...state,
    user: action.payload,
  }));
});

export default loginReducer;
