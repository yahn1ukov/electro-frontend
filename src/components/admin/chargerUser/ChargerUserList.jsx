import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks";
import AuthContext from "../../../context/auth.context";
import {useTranslation} from "react-i18next";
import ChargerUserBlockBtn from "./ChargerUserBlockBtn";
import ChargerUserDeleteBtn from "./ChargerUserDeleteBtn";

const ChargerUserList = () => {
    const [listOfChargerUsers, setListOfChargerUsers] = useState([]);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListOfChargerUsers = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/admins/get/charger/users/all", "GET", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListOfChargerUsers()
            .then(setListOfChargerUsers);
    }, [getListOfChargerUsers]);

    return (
        <div style={{"marginTop": "25px"}}>
           <div className="d-flex justify-content-between">
               <button
                   type="button"
                   className="btn btn-primary"
                   style={{"marginBottom": "10px"}}
                   onClick={() => getListOfChargerUsers().then(setListOfChargerUsers)}
               >
                   {t("buttons.refresh")}
               </button>
               <h3>{t("users.title.chargerUsers")}</h3>
           </div>
            <ul className="list-group">
                {
                    !loading &&
                    listOfChargerUsers.length ?
                        listOfChargerUsers.map(chargerUser => <li key={chargerUser?.email}
                                                                  className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <span>{t("users.elements.company")}: {chargerUser?.company}</span>
                                <span>{t("users.elements.email")}: {chargerUser?.email}</span>
                                <span>{t("users.elements.role")}: {chargerUser?.role}</span>
                                <span>{t("users.elements.createdAt")}: {new Date(chargerUser?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <ChargerUserBlockBtn email={chargerUser?.email} isNotBlock={chargerUser?.isNotBlock}/>
                                <ChargerUserDeleteBtn email={chargerUser?.email}/>
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

export default ChargerUserList;