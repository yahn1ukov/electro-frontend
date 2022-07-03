import {Route, Routes} from "react-router-dom";
import {
    Page404,
    PageChargerUser,
    PageLogin,
    PageModerator,
    PageNoVerificationUsers,
    PagePartnership,
    PageRegistration,
    PageStationUser,
    PageVerificationUsers
} from "../components/pages";

const useRoutes = (isAuthentication, role) => (
    <Routes>
        <Route exact path="/" element={isAuthentication ? <WhatIsUser role={role}/> : <PageLogin/>}/>
        {
            isAuthentication && role === "ADMIN" ?
                <Route path="/no-verification/users" element={<PageNoVerificationUsers/>}/> :
                <>
                    <Route path="/registration" element={<PageRegistration/>}/>
                    <Route path="/apply/partnership" element={<PagePartnership/>}/>
                </>
        }
    </Routes>
);

const WhatIsUser = ({role}) => {
    if (role === "ADMIN") {
        return <PageVerificationUsers/>;
    } else if (role === "CHARGER") {
        return <PageChargerUser/>;
    } else if (role === "STATION") {
        return <PageStationUser/>;
    } else if (role === "MODERATOR") {
        return <PageModerator/>;
    } else {
        return <Page404/>
    }
}

export default useRoutes;