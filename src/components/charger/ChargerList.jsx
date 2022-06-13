import React, {useCallback, useContext, useState} from "react";
import {useHttp} from "../../hooks";
import AuthContext from "../../context/auth.context";
import {useTranslation} from "react-i18next";
import ChargerDeleteBtn from "./ChargerDeleteBtn";

const ChargerList = () => {
    const [listOfChargers, setListOfChargers] = useState([]);
    const {request, loading} = useHttp();
    const {token, id} = useContext(AuthContext);
    const {t} = useTranslation();

    const getListOfChargers = useCallback(async () => {
        try {
            return await request(`http://localhost:8080/api/v1/charger/user/${id}/get/all`, "GET", null, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
        }
    }, [request, token, id]);

    // useEffect(() => {
    //     getListOfChargers()
    //         .then(setListOfChargers);
    // }, [getListOfChargers]);

    return (
        <div style={{"marginTop": "25px", "marginRight": "5px"}} className="flex-fill">
            <button
                type="button"
                className="btn btn-primary"
                style={{"marginBottom": "10px"}}
                onClick={() => getListOfChargers().then(setListOfChargers)}
            >
                {t("buttons.refresh")}
            </button>
            <ul className="list-group">
                {
                    !loading &&
                    listOfChargers.length ?
                        listOfChargers.map(charger => <li key={charger?.id}
                                                          className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">

                            </div>
                            <div>
                                <ChargerDeleteBtn chargerId={charger?.id}/>
                            </div>
                        </li>) :
                        <li className="list-group-item d-flex justify-content-center align-items-center">
                            {t("charger.warnings.charger")}
                        </li>
                }
            </ul>
        </div>
    );
}

export default ChargerList;