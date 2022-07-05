import {useTranslation} from "react-i18next";
import {useHttp} from "../../../hooks";
import React, {useCallback, useContext} from "react";
import AuthContext from "../../../context/auth.context";

const ChargerUserBlockBtn = ({chargerUserId, isNotBlock}) => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    const onBlock = useCallback(async () => {
        try {
            await request(`http://localhost:8080/api/v1/admins/users/chargers/${chargerUserId}/block`, "PATCH", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, chargerUserId, token]);

    return (
        <button
            type="button"
            className="btn btn-submit"
            onClick={onBlock}
            style={{marginRight: "10px"}}
        >
            {
                isNotBlock ?
                    t("buttons.block") :
                    t("buttons.unblock")
            }
        </button>
    );
}

export default ChargerUserBlockBtn;