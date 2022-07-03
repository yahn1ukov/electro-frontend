import React from "react";
import ChargerList from "../../charger/ChargerList";
import ChargerAddForm from "../../charger/ChargerAddForm";

const PageChargerUser = () => {
    return (
        <div>
            <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "marginTop": "50px"}}>
                <ChargerAddForm/>
            </div>
            <ChargerList/>
        </div>
    );
}

export default PageChargerUser;