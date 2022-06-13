import React from "react";
import ComplaintChargerList from "../../moderator/ComplaintChargerList";
import ComplaintStationList from "../../moderator/ComplaintStationList";

const ModeratorPage = () => {
    return (
        <div className="d-flex">
            <ComplaintChargerList/>
            <ComplaintStationList/>
        </div>
    );
}

export default ModeratorPage;