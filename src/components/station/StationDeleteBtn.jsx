import {useTranslation} from "react-i18next";
import {useHttp} from "../../hooks";
import React, {useCallback, useContext} from "react";
import AuthContext from "../../context/auth.context";

const StationDeleteBtn = ({name}) => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token, email} = useContext(AuthContext);

    const onDelete = useCallback(async () => {
        try {
            return await request(`http://localhost:8080/api/v1/stations/${name}/delete/by/station/users/${email}`, "DELETE", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, name, token, email]);

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

export default StationDeleteBtn;