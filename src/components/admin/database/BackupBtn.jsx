import {useTranslation} from "react-i18next";
import {useHttp} from "../../../hooks";
import React, {useCallback, useContext} from "react";
import AuthContext from "../../../context/auth.context";

const BackupBtn = () => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    const onCreateBackup = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/admins/create/backup/db", "POST", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    return (
        <button
            type="button"
            className="btn btn-primary"
            onClick={onCreateBackup}
        >
            {t("buttons.backup")}
        </button>
    );
}

export default BackupBtn;