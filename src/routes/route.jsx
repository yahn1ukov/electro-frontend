import {Route, Routes} from "react-router-dom";
import {
    ChargerUserPage,
    LoginPage,
    ModeratorPage,
    NoVerificationUsersPage,
    PartnershipPage,
    RegistrationPage,
    StationUserPage,
    VerificationUsersPage
} from "../components/pages";

const useRoutes = (isAuthentication, role) => (
    <Routes>
        <Route exact path="/" element={isAuthentication ? <WhatIsUser role={role}/> : <LoginPage/>}/>
        {
            isAuthentication && role === "ADMIN" ?
                <Route path="/no-verification/users" element={<NoVerificationUsersPage/>}/> :
                <>
                    <Route path="/registration" element={<RegistrationPage/>}/>
                    <Route path="/apply/partnership" element={<PartnershipPage/>}/>
                </>
        }
    </Routes>
);

const WhatIsUser = ({role}) => {
    if (role === "CHARGER") {
        return <ChargerUserPage/>;
    } else if (role === "SERVICE") {
        return <StationUserPage/>;
    } else if (role === "MODERATOR") {
        return <ModeratorPage/>;
    } else {
        return <VerificationUsersPage/>;
    }
}

export default useRoutes;