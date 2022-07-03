import React from "react";
import ChargerUserNoVerificationList from "../../admin/chargerUser/ChargerUserNoVerificationList";
import StationUserNoVerificationList from "../../admin/stationUser/StationUserNoVerificationList";

const PageNoVerificationUsers = () => {
    return (
        <div>
            <ChargerUserNoVerificationList/>
            <StationUserNoVerificationList/>
        </div>
    );
}

export default PageNoVerificationUsers;