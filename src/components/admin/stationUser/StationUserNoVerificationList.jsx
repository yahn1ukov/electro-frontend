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
            return await request("http://localhost:8080/api/v1/admins/users/stations/no-verification", "GET", null, {
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
        <div>
            <div className="content-between">
                <button
                    type="button"
                    className="btn btn-submit"
                    style={{"marginBottom": "10px"}}
                    onClick={() => getListOfNoVerificationStationUsers().then(setListOfNoVerificationStationUsers)}
                >
                    {t("buttons.refresh")}
                </button>
                <h3 className="list-title">{t("users.title.stationUsers")}</h3>
            </div>
            <ul className="list">
                {
                    !loading &&
                    listOfNoVerificationStationUsers.length ?
                        listOfNoVerificationStationUsers.map(stationUserNoVerification =>
                            <li key={stationUserNoVerification?.id} className="list-item">
                                <div className="list-item-group">
                                    <span
                                        className="list-item-group-text">{t("users.elements.company")}: {stationUserNoVerification?.company}</span>
                                    <span
                                        className="list-item-group-text">{t("users.elements.email")}: {stationUserNoVerification?.email}</span>
                                    <span
                                        className="list-item-group-text">{t("users.elements.role")}: {stationUserNoVerification?.role}</span>
                                    <span
                                        className="list-item-group-text">{t("users.elements.createdAt")}: {new Date(stationUserNoVerification?.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <StationUserAcceptBtn id={stationUserNoVerification?.id}/>
                                </div>
                            </li>) :
                        <li className="list-item">
                            <span className="list-item-warning">{t("users.warnings.applicationStationUser")}</span>
                        </li>
                }
            </ul>
        </div>
    );
}

export default StationUserNoVerificationList;