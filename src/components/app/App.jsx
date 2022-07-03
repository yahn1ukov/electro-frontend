import React from "react";
import AuthContext from "../../context/auth.context";
import useRoutes from "../../routes/route";
import {useAuth} from "../../hooks";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "../navbar/Navbar";

const App = () => {
    const {id, token, role, login, logout, isAuth} = useAuth();
    const isAuthentication = !!token;
    const routes = useRoutes(isAuthentication, role);

    return (
        <AuthContext.Provider value={{
            id, token, role, login, logout, isAuth
        }}>
            <Router>
                <header>
                    <Navbar isAuthentication={isAuthentication} role={role}/>
                </header>
                <main className="container">
                    {routes}
                </main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
