import {useTranslation} from "react-i18next";
import React from "react";

const MessageLoading = () => {
    const {t} = useTranslation();

    return (
        <p className="message">
            <span className="message-loading">{t("form.message.loading")}</span>
        </p>
    );
}

export default MessageLoading;