import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks";
import AuthContext from "../../../context/auth.context";
import {useTranslation} from "react-i18next";
import UserDeleteBtn from "./UserDeleteBtn";
import UserBlockBtn from "./UserBlockBtn";

const UserList = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListOfUsers = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/admins/get/users/all", "GET", null, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [request, token]);

    useEffect(() => {
        getListOfUsers()
            .then(setListOfUsers);
    }, [getListOfUsers]);

    return (
        <div style={{"marginTop": "25px"}}>
            <button
                type="button"
                className="btn btn-primary"
                style={{"marginBottom": "10px"}}
                onClick={() => getListOfUsers().then(setListOfUsers)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list-group">
                {
                    !loading &&
                    listOfUsers.length ?
                        listOfUsers.map(user => <li key={user?.email}
                                                    className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <span>{t("users.elements.fullName")}: {user?.firstName} {user?.lastName}</span>
                                <span>{t("users.elements.email")}: {user?.email}</span>
                                <span>{t("users.elements.role")}: {user?.role}</span>
                                <span>{t("users.elements.createdAt")}: {new Date(user?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <UserBlockBtn email={user?.email} isNotBlock={user?.isNotBlock}/>
                                <UserDeleteBtn email={user?.email}/>
                            </div>
                        </li>) :
                        <li className="list-group-item d-flex justify-content-center align-items-center">
                            {t("users.warnings.user")}
                        </li>
                }
            </ul>
        </div>
    );
}

export default UserList;