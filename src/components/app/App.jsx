import React from "react";
import AuthContext from "../../context/auth.context";
import useRoutes from "../../routes/routes";
import {useAuth} from "../../hooks";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "../navbar/Navbar";

const App = () => {
    const {token, role, login, logout, isAuth} = useAuth();
    const isAuthentication = !!token;
    const routes = useRoutes(isAuthentication, role);

    return (
        <AuthContext.Provider value={{
            token, role, login, logout, isAuth
        }}>
            <Router>
                <header className="header">
                    <div className="container">
                        <Navbar isAuthentication={isAuthentication}/>
                    </div>
                </header>
                <main className="main">
                    <div className="container">
                        {routes}
                    </div>
                </main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
