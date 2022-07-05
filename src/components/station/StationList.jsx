import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import StationDeleteBtn from "./StationDeleteBtn";
import AuthContext from "../../context/auth.context";

const StationList = () => {
    const [listOfStations, setListOfStations] = useState([]);
    const {request, loading} = useHttp();
    const {t} = useTranslation();
    const {token} = useContext(AuthContext);

    const getListOfStations = useCallback(async () => {
        try {
            return await request(`http://localhost:8080/api/v1/stations/users/current`, "GET", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListOfStations()
            .then(setListOfStations);
    }, [getListOfStations]);

    return (
        <div style={{"marginTop": "25px"}}>
            <button
                type="button"
                className="btn btn-submit"
                style={{"marginBottom": "10px"}}
                onClick={() => getListOfStations().then(setListOfStations)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list">
                {
                    !loading &&
                    listOfStations.length ?
                        listOfStations.map(station => <li key={station?.id} className="list-item">
                            <div className="list-item-group">
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.company")}: {station?.company}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.country")}: {station?.country}, {station?.city}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.street")}: {station?.street}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.zipCode")}: {station?.zipCode}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.name")}: {station?.name}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.cars")}: {station?.carName} {station?.carModel}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.places")}: {t("maintenance.elements.allPlaces")} - {station?.allPlace}, {t("maintenance.elements.freePlaces")}- {station?.freePlace}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.price")}: {station?.middlePriceForPerHour}</span>
                                <span
                                    className="list-item-group-text">{t("maintenance.elements.time")}: {station?.timeFrom} - {station?.timeTo}</span>
                            </div>
                            <div>
                                <StationDeleteBtn stationId={station?.id}/>
                            </div>
                        </li>) :
                        <li className="list-item">
                            <span className="list-item-warning">{t("maintenance.warnings.station")}</span>
                        </li>
                }
            </ul>
        </div>
    );
}

export default StationList;