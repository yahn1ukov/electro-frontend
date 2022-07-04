import {useTranslation} from "react-i18next";
import React from "react";

const MessageLoading = () => {
    const {t} = useTranslation();

    return (
        <span className="message message-loading">{t("form.message.loading")}</span>
    );
}

export default MessageLoading;