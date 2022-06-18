import React from "react";
import StationList from "../../station/StationList";
import StationAddForm from "../../station/StationAddForm";
import StationChangeFreePlaces from "../../station/StationChangeFreePlaces";

const StationUserPage = () => {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <StationAddForm/>
            </div>
            <div className="d-flex justify-content-center">
                <StationChangeFreePlaces/>
            </div>
            <StationList/>
        </div>
    );
}

export default StationUserPage;