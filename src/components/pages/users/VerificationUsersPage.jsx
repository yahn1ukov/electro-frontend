import React from "react";
import UserList from "../../admin/user/UserList";
import StationUserList from "../../admin/stationUser/StationUserList";
import ChargerUserList from "../../admin/chargerUser/ChargerUserList";

const VerificationUsersPage = () => {
    return (
        <div>
            <UserList/>
            <ChargerUserList/>
            <StationUserList/>
        </div>
    );
}

export default VerificationUsersPage;