import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import ComplaintStationDeleteButton from "./ComplaintStationDeleteButton";
import AuthContext from "../../context/auth.context";

const ComplaintStationList = () => {
    const [listComplaintsOfStation, setListComplaintsOfStation] = useState([]);
    const {request, loading} = useHttp();
    const {t} = useTranslation();
    const {token} = useContext(AuthContext);

    const getListComplaintsStation = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/moderators/complaints/stations", "GET", null, {
                Authorization: `Bearer ${token}`
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
            <div className="content-between">
                <button
                    type="button"
                    className="btn btn-submit"
                    style={{"marginBottom": "10px"}}
                    onClick={() => getListComplaintsStation().then(setListComplaintsOfStation)}
                >
                    {t("buttons.refresh")}
                </button>
                <h3 className="list-title">{t("complaint.name.station")}</h3>
            </div>
            <ul className="list">
                {
                    !loading &&
                    listComplaintsOfStation.length ?
                        listComplaintsOfStation.map(complaint => <li key={complaint?.id}
                                                                     className="list-item">
                            <div className="list-item-group">
                                <span
                                    className="list-item-group-text">{t("complaint.elements.user")}: {complaint?.fullName}</span>
                                <span
                                    className="list-item-group-text">{t("complaint.elements.company")}: {complaint?.company}</span>
                                <span
                                    className="list-item-group-text">{t("complaint.elements.name")}: {complaint?.name}</span>
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
                                <ComplaintStationDeleteButton complaintId={complaint?.id}/>
                            </div>
                        </li>) :
                        <li className="list-item">
                            <span className="list-item-warning">{t("complaint.warnings.station")}</span>
                        </li>
                }
            </ul>
        </div>
    );
}

export default ComplaintStationList;