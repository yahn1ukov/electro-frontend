import {Route, Routes} from "react-router-dom";
import {
    AdminPage,
    ChargerUserPage,
    LoginPage,
    ModeratorPage,
    PartnershipPage,
    RegistrationPage,
    StationUserPage,
    UserPage
} from "../components/pages";

const useRoutes = (isAuthentication, role) => (
    <Routes>
        <Route exact path="/" element={isAuthentication ? <WhatIsUser role={role}/> : <LoginPage/>}/>
        {
            !isAuthentication &&
            <>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/apply/partnership" element={<PartnershipPage/>}/>
            </>
        }
    </Routes>
);

const WhatIsUser = ({role}) => {
    if (role === "ADMIN") {
        return <AdminPage/>;
    } else if (role === "CHARGER") {
        return <ChargerUserPage/>;
    } else if (role === "SERVICE") {
        return <StationUserPage/>;
    } else if (role === "MODERATOR") {
        return <ModeratorPage/>;
    } else {
        return <UserPage/>;
    }
}

export default useRoutes;