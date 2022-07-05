import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks";
import {useTranslation} from "react-i18next";
import StationUserDeleteBtn from "./StationUserDeleteBtn";
import StationUserBlockBtn from "./StationUserBlockBtn";
import AuthContext from "../../../context/auth.context";

const StationUserList = () => {
    const [listOfStationUsers, setListOfStationUsers] = useState([]);
    const {request, loading} = useHttp();
    const {t} = useTranslation();
    const {token} = useContext(AuthContext);

    const getListOfStationUsers = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/admins/users/stations", "GET", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListOfStationUsers()
            .then(setListOfStationUsers);
    }, [getListOfStationUsers]);

    return (
        <div style={{"marginTop": "25px"}}>
            <div className="content-between">
                <button
                    type="button"
                    className="btn btn-submit"
                    style={{"marginBottom": "10px"}}
                    onClick={() => getListOfStationUsers().then(setListOfStationUsers)}
                >
                    {t("buttons.refresh")}
                </button>
                <h3 className="list-title">{t("users.title.stationUsers")}</h3>
            </div>
            <ul className="list">
                {
                    !loading &&
                    listOfStationUsers.length ?
                        listOfStationUsers.map(stationUser => <li key={stationUser?.id} className="list-item">
                            <div className="list-item-group">
                                <span
                                    className="list-item-group-text">{t("users.elements.company")}: {stationUser?.company}</span>
                                <span
                                    className="list-item-group-text">{t("users.elements.email")}: {stationUser?.email}</span>
                                <span
                                    className="list-item-group-text">{t("users.elements.role")}: {stationUser?.role}</span>
                                <span
                                    className="list-item-group-text">{t("users.elements.createdAt")}: {new Date(stationUser?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <StationUserBlockBtn stationUserId={stationUser?.id}
                                                     isNotBlock={stationUser?.isNotBlock}/>
                                <StationUserDeleteBtn stationUserId={stationUser?.id}/>
                            </div>
                        </li>) :
                        <li className="list-item">
                            <span className="list-item-warning">{t("users.warnings.stationUser")}</span>
                        </li>
                }
            </ul>
        </div>
    );
}

export default StationUserList;