import {useTranslation} from "react-i18next";
import {useHttp} from "../../../hooks";
import React, {useCallback, useContext} from "react";
import AuthContext from "../../../context/auth.context";

const RestoreBtn = () => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    const onRestoreBackup = useCallback(async () => {
        try {
            await request("http://localhost:8080/api/v1/admins/db/restore", "POST", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    return (
        <button
            type="button"
            className="btn btn-submit"
            onClick={onRestoreBackup}
            style={{marginLeft: "10px"}}
        >
            {t("buttons.restore")}
        </button>
    );
}

export default RestoreBtn;