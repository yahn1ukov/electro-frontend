import {useTranslation} from "react-i18next";
import {useHttp} from "../../hooks";
import React, {useCallback, useContext} from "react";
import AuthContext from "../../context/auth.context";

const ComplaintChargerDeleteButton = ({complaintId}) => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    const onDelete = useCallback(async () => {
        try {
            return await request(`http://localhost:8080/api/v1/moderator/delete/complaint/charger/${complaintId}`, "DELETE", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, complaintId, token]);

    return (
        <button
            type="button"
            className="btn btn-danger"
            onClick={onDelete}
        >
            {t("buttons.delete")}
        </button>
    );
}

export default ComplaintChargerDeleteButton;