const userLoggedIn = ({ loginReducer }) => loginReducer?.user;
const token = ({ loginReducer }) => loginReducer?.user?.token;

export { userLoggedIn, token };
