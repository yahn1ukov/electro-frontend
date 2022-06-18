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
            return await request("http://localhost:8080/api/v1/moderators/get/complaints/of/chargers/all", "GET", null, {
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
                className="btn btn-primary"
                style={{"marginBottom": "10px"}}
                onClick={() => getListComplaintsCharger().then(setListComplaintsOfCharger)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list-group">
                {
                    !loading &&
                    listComplaintsOfCharger.length ?
                        listComplaintsOfCharger.map(complaint => <li key={complaint?.id}
                                                                     className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <span>{t("complaint.elements.user")}: {complaint?.fullName}</span>
                                <span>{t("complaint.elements.company")}: {complaint?.company}</span>
                                <span>{t("complaint.elements.name")}: {complaint?.name}</span>
                                <span>{t("complaint.elements.country")}: {complaint?.country}, {complaint?.city}</span>
                                <span>{t("complaint.elements.street")}: {complaint?.street}</span>
                                <span>{t("complaint.elements.zipCode")}: {complaint?.zipCode}</span>
                                <span>{t("complaint.elements.description")}: {complaint?.description}</span>
                                <span>{t("complaint.elements.createdAt")}: {new Date(complaint?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <ComplaintChargerDeleteButton complaintId={complaint?.id}/>
                            </div>
                        </li>) :
                        <li className="list-group-item d-flex justify-content-center align-items-center">
                            {t("complaint.warnings.charger")}
                        </li>
                }
            </ul>
        </div>
    );
}

export default ComplaintChargerList;