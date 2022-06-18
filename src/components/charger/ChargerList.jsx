import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks";
import AuthContext from "../../context/auth.context";
import {useTranslation} from "react-i18next";
import ChargerDeleteBtn from "./ChargerDeleteBtn";

const ChargerList = () => {
    const [listOfChargers, setListOfChargers] = useState([]);
    const {request, loading} = useHttp();
    const {token, email} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListOfChargers = useCallback(async () => {
        try {
            return await request(`http://localhost:8080/api/v1/chargers/get/all/for/charger/users/${email}`, "GET", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, token, email]);

    useEffect(() => {
        getListOfChargers()
            .then(setListOfChargers);
    }, [getListOfChargers]);

    return (
        <div style={{"marginTop": "5xp", "marginBottom": "20px"}}>
            <button
                type="button"
                className="btn btn-primary"
                style={{"marginBottom": "10px"}}
                onClick={() => getListOfChargers().then(setListOfChargers)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list-group">
                {
                    !loading &&
                    listOfChargers.length ?
                        listOfChargers.map(charger => <li key={charger?.code}
                                                          className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <span>{t("maintenance.elements.company")}: {charger?.company}</span>
                                <span>{t("maintenance.elements.country")}: {charger?.country}, {charger?.city}</span>
                                <span>{t("maintenance.elements.street")}: {charger?.street}</span>
                                <span>{t("maintenance.elements.zipCode")}: {charger?.zipCode}</span>
                                <span>{t("maintenance.elements.code")}: {charger?.code}</span>
                                <span>{t("maintenance.elements.typeConnector")}: {charger?.typeConnector}</span>
                                <span>{t("maintenance.elements.power")}: {charger?.isFast ? t("maintenance.elements.powerFast") : t("maintenance.elements.powerLow")}</span>
                                <span>{t("maintenance.elements.price")}: {charger.isPay ? charger?.priceOfPerHour : t("maintenance.elements.free")}</span>
                                <span>{t("maintenance.elements.time")}: {charger?.timeFrom} - {charger?.timeTo}</span>
                            </div>
                            <div>
                                <ChargerDeleteBtn code={charger?.code}/>
                            </div>
                        </li>) :
                        <li className="list-group-item d-flex justify-content-center align-items-center">
                            {t("maintenance.warnings.charger")}
                        </li>
                }
            </ul>
        </div>
    );
}

export default ChargerList;