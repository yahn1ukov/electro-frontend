import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks";
import AuthContext from "../../context/auth.context";
import {useTranslation} from "react-i18next";
import ComplaintStationDeleteButton from "./ComplaintStationDeleteButton";

const ComplaintStationList = () => {
    const [listComplaintsOfStation, setListComplaintsOfStation] = useState([]);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListComplaintsStation = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/moderators/get/complaints/of/stations/all", "GET", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListComplaintsStation()
            .then(setListComplaintsOfStation);
    }, [getListComplaintsStation]);

    return (
        <div style={{"marginTop": "25px"}}>
            <button
                type="button"
                className="btn btn-primary"
                style={{"marginBottom": "10px"}}
                onClick={() => getListComplaintsStation().then(setListComplaintsOfStation)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list-group">
                {
                    !loading &&
                    listComplaintsOfStation.length ?
                        listComplaintsOfStation.map(complaint => <li key={complaint?.id}
                                                                     className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <span>{t("complaint.elements.user")}: {complaint?.fullName}</span>
                                <span>{t("complaint.elements.company")}: {complaint?.company}</span>
                                <span>{t("complaint.elements.name")}: {complaint?.name}</span>
                                <span>{t("complaint.elements.country")}: {complaint?.country}</span>
                                <span>{t("complaint.elements.city")}: {complaint?.city}</span>
                                <span>{t("complaint.elements.street")}: {complaint?.street}</span>
                                <span>{t("complaint.elements.zipCode")}: {complaint?.zipCode}</span>
                                <span>{t("complaint.elements.description")}: {complaint?.description}</span>
                                <span>{new Date(complaint?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <ComplaintStationDeleteButton complaintId={complaint?.id}/>
                            </div>
                        </li>) :
                        <li className="list-group-item d-flex justify-content-center align-items-center">
                            {t("complaint.warnings.station")}
                        </li>
                }
            </ul>
        </div>
    );
}

export default ComplaintStationList;