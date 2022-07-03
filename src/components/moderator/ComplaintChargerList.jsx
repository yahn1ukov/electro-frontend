import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks";
import AuthContext from "../../context/auth.context";
import ComplaintChargerDeleteButton from "./ComplaintChargerDeleteButton";
import {useTranslation} from "react-i18next";

const ComplaintChargerList = () => {
    const [listComplaintsOfCharger, setListComplaintsOfCharger] = useState([]);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListComplaintsCharger = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/moderators/complaints/chargers", "GET", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListComplaintsCharger()
            .then(setListComplaintsOfCharger);
    }, [getListComplaintsCharger]);

    return (
        <div style={{"marginTop": "25px"}}>
            <button
                type="button"
                className="btn btn-submit"
                style={{"marginBottom": "10px"}}
                onClick={() => getListComplaintsCharger().then(setListComplaintsOfCharger)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list">
                {
                    !loading &&
                    listComplaintsOfCharger.length ?
                        listComplaintsOfCharger.map(complaint => <li key={complaint?.id} className="list-item">
                            <div className="list-item-group">
                                <span
                                    className="list-item-group-text">{t("complaint.elements.user")}: {complaint?.fullName}</span>
                                <span
                                    className="list-item-group-text">{t("complaint.elements.company")}: {complaint?.company}</span>
                                <span
                                    className="list-item-group-text">{t("complaint.elements.code")}: {complaint?.code}</span>
                                <span
                                    className="list-item-group-text">{t("complaint.elements.country")}: {complaint?.country}, {complaint?.city}</span>
                                <span
                                    className="list-item-group-text">{t("complaint.elements.street")}: {complaint?.street}</span>
                                <span
                                    className="list-item-group-text">{t("complaint.elements.zipCode")}: {complaint?.zipCode}</span>
                                <span
                                    className="list-item-group-text">{t("complaint.elements.description")}: {complaint?.description}</span>
                                <span
                                    className="list-item-group-text">{t("complaint.elements.createdAt")}: {new Date(complaint?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <ComplaintChargerDeleteButton id={complaint?.id}/>
                            </div>
                        </li>) :
                        <li className="list-item">
                            <span className="list-item-warning">{t("complaint.warnings.charger")}</span>
                        </li>
                }
            </ul>
        </div>
    );
}

export default ComplaintChargerList;