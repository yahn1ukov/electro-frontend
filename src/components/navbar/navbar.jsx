import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const Navbar = ({isAuthentication, role}) => {
    const {t, i18n} = useTranslation();

    const changeLanguageHandler = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            isAuthentication ?
                                null :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link"
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
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;