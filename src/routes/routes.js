import {Route, Routes} from "react-router-dom";
import {
    Page404,
    PageAdminUser,
    PageChargerUser,
    PageLogin,
    PageModerator,
    PagePartnership,
    PageRegistration,
    PageStationUser
} from "../components/pages";

const useRoutes = (isAuthentication, role) => (
    <Routes>
        <Route path="/" element={isAuthentication ? <WhatIsUser role={role}/> : <PageLogin/>}/>
        {
            !isAuthentication &&
            <>
                <Route path="/registration" element={<PageRegistration/>}/>
                <Route path="/partnership" element={<PagePartnership/>}/>
            </>
        }
    </Routes>
);

const WhatIsUser = ({role}) => {
    if (role === "ADMIN") {
        return <PageAdminUser/>;
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