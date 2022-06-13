import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks";
import AuthContext from "../../context/auth.context";

const ChargerUser = () => {
    const {request, loading} = useHttp();
    const {token, id} = useContext(AuthContext);
    const [chargerUser, setChargerUser] = useState(null);

    const getChargerUser = useCallback(async () => {
        try {
            return await request(`http://localhost:5000/api/v1/charger/user/${id}`, "GET", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, token, id]);

    useEffect(() => {
        getChargerUser()
            .then(setChargerUser)
    }, [getChargerUser])

    return (
        <div>User</div>
    );
}

export default ChargerUser;