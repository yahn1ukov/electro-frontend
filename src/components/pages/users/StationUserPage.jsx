import React from "react";
import StationList from "../../station/StationList";
import StationAddForm from "../../station/StationAddForm";

const StationUserPage = () => {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <StationAddForm/>
            </div>
            <StationList/>
        </div>
    );
}

export default StationUserPage;