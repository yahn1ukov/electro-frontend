import {createContext} from "react";

const login = (id, token, role) => {
};
const logout = () => {
};

const AuthContext = createContext({
    id: null,
    token: null,
    role: null,
    login,
    logout,
    isAuth: false
});

export default AuthContext;