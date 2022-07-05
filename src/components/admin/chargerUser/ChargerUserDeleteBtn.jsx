import {useTranslation} from "react-i18next";
import {useHttp} from "../../../hooks";
import React, {useCallback, useContext} from "react";
import AuthContext from "../../../context/auth.context";

const ChargerUserDeleteBtn = ({chargerUserId}) => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    const onDelete = useCallback(async () => {
        try {
            await request(`http://localhost:8080/api/v1/admins/users/chargers/${chargerUserId}/delete`, "DELETE", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, chargerUserId, token]);

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

export default ChargerUserDeleteBtn;