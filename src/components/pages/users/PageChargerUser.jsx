import React from "react";
import ChargerList from "../../charger/ChargerList";
import ChargerAddForm from "../../charger/ChargerAddForm";

const PageChargerUser = () => {
    return (
        <div>
            <div className="content-center">
                <ChargerAddForm/>
            </div>
            <ChargerList/>
        </div>
    );
}

export default PageChargerUser;