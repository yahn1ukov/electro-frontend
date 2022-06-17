import {useTranslation} from "react-i18next";
import {useHttp} from "../../../hooks";
import React, {useCallback, useContext} from "react";
import AuthContext from "../../../context/auth.context";

const StationUserBlockBtn = ({email, isNotBlock}) => {
    const {t} = useTranslation();
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    const onBlock = useCallback(async () => {
        try {
            await request(`http://localhost:8080/api/v1/admins/block/station/users/${email}`, "PATCH", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, email, token]);

    return (
        <button
            type="button"
            className="btn btn-primary"
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

export default StationUserBlockBtn;