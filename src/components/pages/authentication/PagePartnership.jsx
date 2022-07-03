import React from "react";
import {FormChargerPartnership, FormStationPartnership} from "../../forms";

const PagePartnership = () => {
    return (
        <div style={{"display": "flex", "justifyContent": "space-around", "alignItems": "center", "marginTop": "50px"}}>
            <FormChargerPartnership/>
            <FormStationPartnership/>
        </div>
    );
}

export default PagePartnership;