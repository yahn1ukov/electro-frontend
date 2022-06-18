import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks";
import AuthContext from "../../../context/auth.context";
import {useTranslation} from "react-i18next";
import StationUserDeleteBtn from "./StationUserDeleteBtn";
import StationUserBlockBtn from "./StationUserBlockBtn";

const StationUserList = () => {
    const [listOfStationUsers, setListOfStationUsers] = useState([]);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListOfStationUsers = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/admins/get/station/users/all", "GET", null, {
                Authorization: `${token}`
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
           <div className="d-flex justify-content-between">
               <button
                   type="button"
                   className="btn btn-primary"
                   style={{"marginBottom": "10px"}}
                   onClick={() => getListOfStationUsers().then(setListOfStationUsers)}
               >
                   {t("buttons.refresh")}
               </button>
               <h3>{t("users.title.stationUsers")}</h3>
           </div>
            <ul className="list-group">
                {
                    !loading &&
                    listOfStationUsers.length ?
                        listOfStationUsers.map(stationUser => <li key={stationUser?.email}
                                                                  className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <span>{t("users.elements.company")}: {stationUser?.company}</span>
                                <span>{t("users.elements.email")}: {stationUser?.email}</span>
                                <span>{t("users.elements.role")}: {stationUser?.role}</span>
                                <span>{t("users.elements.createdAt")}: {new Date(stationUser?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <StationUserBlockBtn email={stationUser?.email} isNotBlock={stationUser?.isNotBlock}/>
                                <StationUserDeleteBtn email={stationUser?.email}/>
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

export default StationUserList;