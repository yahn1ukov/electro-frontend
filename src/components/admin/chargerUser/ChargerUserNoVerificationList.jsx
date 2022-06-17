import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks";
import AuthContext from "../../../context/auth.context";
import {useTranslation} from "react-i18next";
import ChargerUserAcceptBtn from "./ChargerUserAcceptBtn";

const ChargerUserNoVerificationList = () => {
    const [listOfNoVerificationChargerUsers, setListOfNoVerificationChargerUsers] = useState([]);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListOfNoVerificationChargerUsers = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/admins/get/no-verification/charger/users/all", "GET", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListOfNoVerificationChargerUsers()
            .then(setListOfNoVerificationChargerUsers);
    }, [getListOfNoVerificationChargerUsers]);

    return (
        <div style={{"marginTop": "25px"}} className="flex-grow-1">
            <button
                type="button"
                className="btn btn-primary"
                style={{"marginBottom": "10px"}}
                onClick={() => getListOfNoVerificationChargerUsers().then(setListOfNoVerificationChargerUsers)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list-group">
                {
                    !loading &&
                    listOfNoVerificationChargerUsers.length ?
                        listOfNoVerificationChargerUsers.map(chargerUserNoVerification => <li
                            key={chargerUserNoVerification?.email}
                            className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <span>{t("users.elements.company")}: {chargerUserNoVerification?.company}</span>
                                <span>{t("users.elements.email")}: {chargerUserNoVerification?.email}</span>
                                <span>{t("users.elements.role")}: {chargerUserNoVerification?.role}</span>
                                <span>{t("users.elements.createdAt")}: {new Date(chargerUserNoVerification?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <ChargerUserAcceptBtn email={chargerUserNoVerification?.email}/>
                            </div>
                        </li>) :
                        <li className="list-group-item d-flex justify-content-center align-items-center">
                            {t("users.warnings.chargerUser")}
                        </li>
                }
            </ul>
        </div>
    );
}

export default ChargerUserNoVerificationList;