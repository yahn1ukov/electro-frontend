import React from "react";
import UserList from "../../admin/user/UserList";
import StationUserList from "../../admin/stationUser/StationUserList";
import ChargerUserList from "../../admin/chargerUser/ChargerUserList";
import BackupBtn from "../../admin/database/BackupBtn";
import RestoreBtn from "../../admin/database/RestoreBtn";
import UserChangeRole from "../../admin/user/UserChangeRole";

const VerificationUsersPage = () => {
    return (
        <div>
            <div className="d-flex justify-content-end" style={{marginTop: "25px"}}>
                <BackupBtn/>
                <RestoreBtn/>
            </div>
            <div className="d-flex justify-content-center">
                <UserChangeRole/>
            </div>
            <UserList/>
            <ChargerUserList/>
            <StationUserList/>
        </div>
    );
}

export default VerificationUsersPage;