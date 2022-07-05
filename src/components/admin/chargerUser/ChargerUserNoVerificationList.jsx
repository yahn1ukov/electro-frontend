import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks";
import {useTranslation} from "react-i18next";
import ChargerUserAcceptBtn from "./ChargerUserAcceptBtn";
import AuthContext from "../../../context/auth.context";

const ChargerUserNoVerificationList = () => {
    const [listOfNoVerificationChargerUsers, setListOfNoVerificationChargerUsers] = useState([]);
    const {request, loading} = useHttp();
    const {t} = useTranslation();
    const {token} = useContext(AuthContext);

    const getListOfNoVerificationChargerUsers = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/admins/users/chargers/no-verification", "GET", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListOfNoVerificationChargerUsers()
            .then(setListOfNoVerificationChargerUsers);
    }, [getListOfNoVerificationChargerUsers]);

    return (
        <div>
            <div className="content-between">
                <button
                    type="button"
                    className="btn btn-submit"
                    style={{"marginBottom": "10px"}}
                    onClick={() => getListOfNoVerificationChargerUsers().then(setListOfNoVerificationChargerUsers)}
                >
                    {t("buttons.refresh")}
                </button>
                <h3 className="list-title">{t("users.title.chargerUsers")}</h3>
            </div>
            <ul className="list">
                {
                    !loading &&
                    listOfNoVerificationChargerUsers.length ?
                        listOfNoVerificationChargerUsers.map(chargerUserNoVerification =>
                            <li key={chargerUserNoVerification?.id} className="list-item">
                                <div className="list-item-group">
                                <span
                                    className="list-item-group-text">{t("users.elements.company")}: {chargerUserNoVerification?.company}</span>
                                    <span
                                        className="list-item-group-text">{t("users.elements.email")}: {chargerUserNoVerification?.email}</span>
                                    <span
                                        className="list-item-group-text">{t("users.elements.role")}: {chargerUserNoVerification?.role}</span>
                                    <span
                                        className="list-item-group-text">{t("users.elements.createdAt")}: {new Date(chargerUserNoVerification?.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <ChargerUserAcceptBtn chargerUserId={chargerUserNoVerification?.id}/>
                                </div>
                            </li>) :
                        <li className="list-item">
                            <span className="list-item-warning">{t("users.warnings.applicationChargerUser")}</span>
                        </li>
                }
            </ul>
        </div>
    );
}

export default ChargerUserNoVerificationList;