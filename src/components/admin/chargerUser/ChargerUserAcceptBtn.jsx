import {useTranslation} from "react-i18next";
import {useHttp} from "../../../hooks";
import React, {useCallback, useContext} from "react";
import AuthContext from "../../../context/auth.context";

const ChargerUserAcceptBtn = ({email}) => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    const onAccept = useCallback(async () => {
        try {
            await request(`http://localhost:8080/api/v1/admins/accept/verification/charger/users/${email}`, "PATCH", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, email, token]);

    return (
        <button
            type="button"
            className="btn btn-primary"
            onClick={onAccept}
        >
            {t("buttons.submit")}
        </button>
    );
}

export default ChargerUserAcceptBtn;