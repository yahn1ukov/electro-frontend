import React from "react";

const MessageSuccess = ({success}) => (
    <p className="message">
        <span className="message-success">{success}</span>
    </p>
);

export default MessageSuccess;