import React from "react";
import StationList from "../../station/StationList";
import StationAddForm from "../../station/StationAddForm";
import StationChangeFreePlaces from "../../station/StationChangeFreePlaces";

const PageStationUser = () => {
    return (
        <div>
            <div className="content-center">
                <StationAddForm/>
            </div>
            <div className="content-center">
                <StationChangeFreePlaces/>
            </div>
            <StationList/>
        </div>
    );
}

export default PageStationUser;