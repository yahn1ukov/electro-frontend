import React from "react";
import ComplaintChargerList from "../moderator/ComplaintChargerList";
import ComplaintStationList from "../moderator/ComplaintStationList";

const PageModerator = () => {

    return (
        <div>
            <ComplaintChargerList/>
            <ComplaintStationList/>
        </div>
    );
}

export default PageModerator;