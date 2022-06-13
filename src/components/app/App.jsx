import React from "react";
import AuthContext from "../../context/auth.context";
import useRoutes from "../../routes/route";
import {useAuth} from "../../hooks";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "../navbar/navbar";

const App = () => {
    const {id, email, token, role, login, logout, isAuth} = useAuth();
    const isAuthentication = !!token;
    const routes = useRoutes(isAuthentication, role);

    return (
        <AuthContext.Provider value={{
            id, email, token, role, login, logout, isAuth
        }}>
            <Router>
                <header>
                    <Navbar isAuthentication={isAuthentication} role={role}/>
                </header>
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
