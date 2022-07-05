import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks";
import {useTranslation} from "react-i18next";
import UserDeleteBtn from "./UserDeleteBtn";
import UserBlockBtn from "./UserBlockBtn";
import AuthContext from "../../../context/auth.context";

const UserList = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    const {request, loading} = useHttp();
    const {t} = useTranslation();
    const {token} = useContext(AuthContext);

    const getListOfUsers = useCallback(async () => {
        try {
            return await request("http://localhost:8080/api/v1/admins/users", "GET", null, {
                Authorization: `Bearer ${token}`
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
            <div className="content-between">
                <button
                    type="button"
                    className="btn btn-submit"
                    style={{"marginBottom": "10px"}}
                    onClick={() => getListOfUsers().then(setListOfUsers)}
                >
                    {t("buttons.refresh")}
                </button>
                <h3 className="list-title">{t("users.title.users")}</h3>
            </div>
            <ul className="list">
                {
                    !loading &&
                    listOfUsers.length ?
                        listOfUsers.map(user => <li key={user?.id} className="list-item">
                            <div className="list-item-group">
                                <span
                                    className="list-item-group-text">{t("users.elements.fullName")}: {user?.fullName}</span>
                                <span className="list-item-group-text">{t("users.elements.email")}: {user?.email}</span>
                                <span className="list-item-group-text">{t("users.elements.role")}: {user?.role}</span>
                                <span
                                    className="list-item-group-text">{t("users.elements.createdAt")}: {new Date(user?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <UserBlockBtn userId={user?.id} isNotBlock={user?.isNotBlock}/>
                                <UserDeleteBtn userId={user?.id}/>
                            </div>
                        </li>) :
                        <li className="list-item">
                            <span className="list-item-warning">{t("users.warnings.user")}</span>
                        </li>
                }
            </ul>
        </div>
    );
}

export default UserList;