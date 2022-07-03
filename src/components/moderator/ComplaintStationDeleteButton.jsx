import React, {useCallback, useContext} from "react";
import {useTranslation} from "react-i18next";
import AuthContext from "../../context/auth.context";
import {useHttp} from "../../hooks";

const ComplaintStationDeleteButton = ({id}) => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    const onDelete = useCallback(async () => {
        try {
            await request(`http://localhost:8080/api/v1/moderators/complaints/stations/${id}/delete`, "DELETE", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, id, token]);

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

export default ComplaintStationDeleteButton;