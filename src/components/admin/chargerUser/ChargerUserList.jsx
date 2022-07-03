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
            return await request("http://localhost:8080/api/v1/admins/users/chargers", "GET", null, {
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
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center"}}>
                <button
                    type="button"
                    className="btn btn-submit"
                    style={{"marginBottom": "10px"}}
                    onClick={() => getListOfChargerUsers().then(setListOfChargerUsers)}
                >
                    {t("buttons.refresh")}
                </button>
                <h3 className="list-title">{t("users.title.chargerUsers")}</h3>
            </div>
            <ul className="list">
                {
                    !loading &&
                    listOfChargerUsers.length ?
                        listOfChargerUsers.map(chargerUser => <li key={chargerUser?.id} className="list-item">
                            <div className="list-item-group">
                                <span
                                    className="list-item-group-text">{t("users.elements.company")}: {chargerUser?.company}</span>
                                <span
                                    className="list-item-group-text">{t("users.elements.email")}: {chargerUser?.email}</span>
                                <span
                                    className="list-item-group-text">{t("users.elements.role")}: {chargerUser?.role}</span>
                                <span
                                    className="list-item-group-text">{t("users.elements.createdAt")}: {new Date(chargerUser?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <ChargerUserBlockBtn id={chargerUser?.id} isNotBlock={chargerUser?.isNotBlock}/>
                                <ChargerUserDeleteBtn id={chargerUser?.id}/>
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