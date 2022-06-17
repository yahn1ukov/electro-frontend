import React from "react";
import ChargerUserNoVerificationList from "../../admin/chargerUser/ChargerUserNoVerificationList";
import StationUserNoVerificationList from "../../admin/stationUser/StationUserNoVerificationList";

const NoVerificationUsersPage = () => {
    return (
        <div>
            <ChargerUserNoVerificationList/>
            <StationUserNoVerificationList/>
        </div>
    );
}

export default NoVerificationUsersPage;