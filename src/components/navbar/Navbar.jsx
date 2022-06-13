import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {AdminPage, ChargerUserPage, StationUserPage} from "../pages";
import {useAuth, useHttp} from "../../hooks";

const Navbar = ({isAuthentication, role}) => {
    const {t, i18n} = useTranslation();
    const {request} = useHttp();
    const {logout} = useAuth();

    const changeLanguageHandler = (language) => {
        i18n.changeLanguage(language);
    }

    const onLeave = async () => {
        try {
            await request("http://localhost:8080/api/v1/auth/logout", "POST", null);
            logout();
        } catch (e) {
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Electro</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="list-group list-group-horizontal">
                        <button
                            className="list-group-item"
                            onClick={() => changeLanguageHandler("en")}>
                            EN
                        </button>
                        <button
                            className="list-group-item"
                            onClick={() => changeLanguageHandler("ua")}>
                            UA
                        </button>
                    </ul>
                    <ul className="navbar-nav">
                        {
                            isAuthentication ?
                                <>
                                    <WhatIsUser role={role}/>
                                    <li className="nav-item" onClick={onLeave}>
                                        <span className="nav-link">{t("navbar.isAuthentication.leave")}</span>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active"
                                              aria-current="page"
                                              to="/">{t("navbar.isNotAuthentication.login")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link"
                                              to="/registration">{t("navbar.isNotAuthentication.registration")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link"
                                              to="/apply/partnership">{t("navbar.isNotAuthentication.partnership")}</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const WhatIsUser = ({role}) => {
    if (role === "CHARGER") {
        return <ChargerUserPage/>;
    } else if (role === "SERVICE") {
        return <StationUserPage/>;
    } else if (role === "MODERATOR") {
        return null;
    } else {
        return <AdminPage/>;
    }
}


export default Navbar;