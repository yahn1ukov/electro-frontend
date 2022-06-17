import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks";
import AuthContext from "../../../context/auth.context";
import {useTranslation} from "react-i18next";
import StationUserAcceptBtn from "./StationUserAcceptBtn";

const StationUserNoVerificationList = () => {
    const [listOfNoVerificationStationUsers, setListOfNoVerificationStationUsers] = useState([]);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListOfNoVerificationStationUsers = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/admins/get/no-verification/station/users/all", "GET", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListOfNoVerificationStationUsers()
            .then(setListOfNoVerificationStationUsers);
    }, [getListOfNoVerificationStationUsers]);

    return (
        <div style={{"marginTop": "25px"}} className="flex-grow-1">
            <button
                type="button"
                className="btn btn-primary"
                style={{"marginBottom": "10px"}}
                onClick={() => getListOfNoVerificationStationUsers().then(setListOfNoVerificationStationUsers)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list-group">
                {
                    !loading &&
                    listOfNoVerificationStationUsers.length ?
                        listOfNoVerificationStationUsers.map(stationUserNoVerification => <li
                            key={stationUserNoVerification?.email}
                            className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <span>{t("users.elements.company")}: {stationUserNoVerification?.company}</span>
                                <span>{t("users.elements.email")}: {stationUserNoVerification?.email}</span>
                                <span>{t("users.elements.role")}: {stationUserNoVerification?.role}</span>
                                <span>{t("users.elements.createdAt")}: {new Date(stationUserNoVerification?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <StationUserAcceptBtn email={stationUserNoVerification?.email}/>
                            </div>
                        </li>) :
                        <li className="list-group-item d-flex justify-content-center align-items-center">
                            {t("users.warnings.stationUser")}
                        </li>
                }
            </ul>
        </div>
    );
}

export default StationUserNoVerificationList;