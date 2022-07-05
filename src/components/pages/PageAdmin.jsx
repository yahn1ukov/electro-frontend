import React from "react";
import UserList from "../admin/user/UserList";
import BackupBtn from "../admin/database/BackupBtn";
import RestoreBtn from "../admin/database/RestoreBtn";
import UserChangeRole from "../admin/user/UserChangeRole";
import ChargerUserList from "../admin/chargerUser/ChargerUserList";
import StationUserList from "../admin/stationUser/StationUserList";
import ChargerUserNoVerificationList from "../admin/chargerUser/ChargerUserNoVerificationList";
import StationUserNoVerificationList from "../admin/stationUser/StationUserNoVerificationList";

const PageAdmin = () => {

    return (
        <div>
            <div className="content-end">
                <BackupBtn/>
                <RestoreBtn/>
            </div>
            <div className="content-center" style={{"marginTop": "25px"}}>
                <UserChangeRole/>
            </div>
            <div className="content-fill" style={{"marginTop": "25px"}}>
                <ChargerUserNoVerificationList/>
                <StationUserNoVerificationList/>
            </div>
            <UserList/>
            <ChargerUserList/>
            <StationUserList/>
        </div>
    );
}

export default PageAdmin;