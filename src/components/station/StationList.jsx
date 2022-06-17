import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks";
import AuthContext from "../../context/auth.context";
import {useTranslation} from "react-i18next";
import StationDeleteBtn from "./StationDeleteBtn";

const StationList = () => {
    const [listOfStations, setListOfStations] = useState([]);
    const {request, loading} = useHttp();
    const {token, email} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListOfStations = useCallback(async () => {
        try {
            return await request(`http://localhost:8080/api/v1/stations/get/all/for/station/users/${email}`, "GET", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, token, email]);

    useEffect(() => {
        getListOfStations()
            .then(setListOfStations);
    }, [getListOfStations]);

    return (
        <div style={{"marginTop": "25px"}}>
            <button
                type="button"
                className="btn btn-primary"
                style={{"marginBottom": "10px"}}
                onClick={() => getListOfStations().then(setListOfStations)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list-group">
                {
                    !loading &&
                    listOfStations.length ?
                        listOfStations.map(station => <li key={station?.name}
                                                          className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <span>{t("maintenance.elements.company")}: {station?.company}</span>
                                <span>{t("maintenance.elements.country")}: {station?.country}, {station?.city}</span>
                                <span>{t("maintenance.elements.street")}: {station?.street}</span>
                                <span>{t("maintenance.elements.zipCode")}: {station?.zipCode}</span>
                                <span>{t("maintenance.elements.name")}: {station?.name}</span>
                                <span>{t("maintenance.elements.cars")}: {station?.carName}, {station?.carModel}</span>
                                <span>{t("maintenance.elements.places")}: {t("maintenance.elements.allPlaces")} - {station?.allPlace}, {t("maintenance.elements.freePlaces")}- {station?.freePlace}</span>
                                <span>{t("maintenance.elements.price")}: {station?.middlePriceForPerHour}</span>
                                <span>{t("maintenance.elements.time")}: {station?.timeFrom} - {station?.timeTo}</span>
                                <span>{t("maintenance.elements.createdAt")}: {new Date(station?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <StationDeleteBtn name={station?.name}/>
                            </div>
                        </li>) :
                        <li className="list-group-item d-flex justify-content-center align-items-center">
                            {t("maintenance.warnings.station")}
                        </li>
                }
            </ul>
        </div>
    );
}

export default StationList;