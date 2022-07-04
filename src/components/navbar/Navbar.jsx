import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks";

const Navbar = ({isAuthentication, role}) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const {t, i18n} = useTranslation();
    const {logout} = useAuth();

    const changeLanguageHandler = (language) => {
        i18n.changeLanguage(language);
    }

    const changeHandler = () => {
        setActiveMenu(!activeMenu);
    }

    const onLeave = () => {
        logout();
    }

    return (
        <div className="header__body">
            <Link className="header__logo" to="/">
                Electro
            </Link>
            <div className={activeMenu ? "header__burger active" : "header__burger"} onClick={changeHandler}>
                <span></span>
            </div>
            <nav className={activeMenu ? "header__menu active" : "header__menu"}>
                <ul className="header__list">
                    {
                        isAuthentication ?
                            <li className="header__list-item" onClick={onLeave}>
                                <span className="header__list-link">{t("navbar.isAuthentication.leave")}</span>
                            </li> :
                            <>
                                <li className="header__list-item">
                                    <Link className="header__list-link"
                                          to="/">{t("navbar.isNotAuthentication.login")}</Link>
                                </li>
                                <li className="header__list-item">
                                    <Link className="header__list-link"
                                          to="/registration">{t("navbar.isNotAuthentication.registration")}</Link>
                                </li>
                                <li className="header__list-item">
                                    <Link className="header__list-link"
                                          to="/partnership">{t("navbar.isNotAuthentication.partnership")}</Link>
                                </li>
                            </>
                    }
                    <li className="header__list-languages">
                        <button
                            onClick={() => changeLanguageHandler("en")}>
                            EN
                        </button>
                        <button
                            onClick={() => changeLanguageHandler("ua")}>
                            UA
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;