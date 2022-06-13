import {useTranslation} from "react-i18next";
import {useHttp} from "../../hooks";
import React, {useCallback, useContext} from "react";
import AuthContext from "../../context/auth.context";

const ChargerDeleteBtn = ({chargerId}) => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token, id} = useContext(AuthContext);

    const onDelete = useCallback(async () => {
        try {
            return await request(`http://localhost:8080/api/v1/charger/user/${id}/delete/${chargerId}`, "DELETE", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, chargerId, token, id]);

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

export default ChargerDeleteBtn;