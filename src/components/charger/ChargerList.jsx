import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import ChargerDeleteBtn from "./ChargerDeleteBtn";
import AuthContext from "../../context/auth.context";

const ChargerList = () => {
    const [listOfChargers, setListOfChargers] = useState([]);
    const {request, loading} = useHttp();
    const {t} = useTranslation();
    const {token} = useContext(AuthContext);

    const getListOfChargers = useCallback(async () => {
        try {
            return await request(`http://localhost:8080/api/v1/chargers/users/current`, "GET", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListOfChargers()
            .then(setListOfChargers);
    }, [getListOfChargers]);

    return (
        <div style={{"marginTop": "25px"}}>
            <button
                type="button"
                className="btn btn-submit"
                style={{"marginBottom": "10px"}}
                onClick={() => getListOfChargers().then(setListOfChargers)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list">
                {
                    !loading &&
                    listOfChargers.length ?
                        listOfChargers.map(charger => <li key={charger?.id} className="list-item">
                            <div className="list-item-group">
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.company")}: {charger?.company}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.country")}: {charger?.country}, {charger?.city}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.street")}: {charger?.street}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.zipCode")}: {charger?.zipCode}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.code")}: {charger?.code}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.typeConnector")}: {charger?.typeConnector}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.power")}: {charger?.isFast ? t("maintenance.elements.powerFast") : t("maintenance.elements.powerLow")}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.price")}: {charger.isPay ? charger?.priceOfPerHour : t("maintenance.elements.free")}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.time")}: {charger?.timeFrom} - {charger?.timeTo}</span>
                            </div>
                            <div>
                                <ChargerDeleteBtn chargerId={charger?.id}/>
                            </div>
                        </li>) :
                        <li className="list-item">
                            <span className="list-item-warning">{t("maintenance.warnings.charger")}</span>
                        </li>
                }
            </ul>
        </div>
    );
}

export default ChargerList;