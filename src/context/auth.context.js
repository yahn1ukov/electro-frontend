import {createContext} from "react";

const login = (token, role) => {
};
const logout = () => {
};

const AuthContext = createContext({
    token: null,
    role: null,
    login,
    logout,
    isAuth: false
});

export default AuthContext;