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
            return await request("http://localhost:8080/api/v1/admins/users", "GET", null, {
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
        <div style={{"marginTop": "5px"}}>
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center"}}>
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
                                <UserBlockBtn id={user?.id} isNotBlock={user?.isNotBlock}/>
                                <UserDeleteBtn id={user?.id}/>
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