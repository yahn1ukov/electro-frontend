import React from "react";
import ChargerList from "../../charger/ChargerList";
import ChargerAddForm from "../../charger/ChargerAddForm";

const ChargerUserPage = () => {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <ChargerAddForm/>
            </div>
            <ChargerList/>
        </div>
    );
}

export default ChargerUserPage;