import { createReducer } from "@reduxjs/toolkit";
import { setLoginCredentials } from "../actions/loginActions";

const initialState = {
  user: null,
};
const loginReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoginCredentials, (state, action) => ({
    ...state,
  }));
});

export default loginReducer;
