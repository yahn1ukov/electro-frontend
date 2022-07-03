import React from "react";
import UserList from "../../admin/user/UserList";
import BackupBtn from "../../admin/database/BackupBtn";
import RestoreBtn from "../../admin/database/RestoreBtn";
import UserChangeRole from "../../admin/user/UserChangeRole";
import ChargerUserList from "../../admin/chargerUser/ChargerUserList";
import StationUserList from "../../admin/stationUser/StationUserList";

const PageVerificationUsers = () => {
    return (
        <div>
            <div style={{"display": "flex", "justifyContent": "end", "alignItems": "center", "marginTop": "25px"}}>
                <BackupBtn/>
                <RestoreBtn/>
            </div>
            <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "marginTop": "10px"}}>
                <UserChangeRole/>
            </div>
            <UserList/>
            <ChargerUserList/>
            <StationUserList/>
        </div>
    );
}

export default PageVerificationUsers;