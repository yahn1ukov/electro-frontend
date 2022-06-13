import {createContext} from "react";

const login = (id, email, token, role) => {
};
const logout = () => {
};

const AuthContext = createContext({
    id: null,
    email: null,
    token: null,
    role: null,
    login,
    logout,
    isAuth: false
});

export default AuthContext;