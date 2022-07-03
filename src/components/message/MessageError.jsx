import React from "react";

const MessageError = ({error}) => (
    <p className="message">
        <span className="message-error">{error}</span>
    </p>
);

export default MessageError;