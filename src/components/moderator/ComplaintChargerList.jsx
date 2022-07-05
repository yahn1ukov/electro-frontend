import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks";
import ComplaintChargerDeleteButton from "./ComplaintChargerDeleteButton";
import {useTranslation} from "react-i18next";
import AuthContext from "../../context/auth.context";

const ComplaintChargerList = () => {
    const [listComplaintsOfCharger, setListComplaintsOfCharger] = useState([]);
    const {request, loading} = useHttp();
    const {t} = useTranslation();
    const {token} = useContext(AuthContext);

    const getListComplaintsCharger = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/moderators/complaints/chargers", "GET", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListComplaintsCharger()
            .then(setListComplaintsOfCharger);
    }, [getListComplaintsCharger]);

    return (
        <div>
            <div className="content-between">
                <button
                    type="button"
                    className="btn btn-submit"
                    style={{"marginBottom": "10px"}}
                    onClick={() => getListComplaintsCharger().then(setListComplaintsOfCharger)}
                >
                    {t("buttons.refresh")}
                </button>
                <h3 className="list-title">{t("complaint.name.charger")}</h3>
            </div>
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
                                <ComplaintChargerDeleteButton complaintId={complaint?.id}/>
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