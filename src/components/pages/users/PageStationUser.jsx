import React from "react";
import StationList from "../../station/StationList";
import StationAddForm from "../../station/StationAddForm";
import StationChangeFreePlaces from "../../station/StationChangeFreePlaces";

const PageStationUser = () => {
    return (
        <div>
            <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "marginTop": "50px"}}>
                <StationAddForm/>
            </div>
            <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "marginTop": "50px"}}>
                <StationChangeFreePlaces/>
            </div>
            <StationList/>
        </div>
    );
}

export default PageStationUser;