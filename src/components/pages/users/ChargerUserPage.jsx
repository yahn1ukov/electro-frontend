import React from "react";
import ChargerList from "../../charger/ChargerList";
import ChargerUser from "../../charger/ChargerUser";

const ChargerUserPage = () => {
    return (
        <div>
            <ChargerUser/>
            <div>
                <ChargerList/>
            </div>
        </div>
    );
}

export default ChargerUserPage;