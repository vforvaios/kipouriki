import loginReducer from "../reducers/loginReducer";

const userLoggedIn = ({ loginReducer }) => loginReducer.user;

export { userLoggedIn };
