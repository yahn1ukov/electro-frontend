import React from "react";
import {ChargerPartnershipForm, StationPartnershipForm} from "../../authenticationForms";

const PartnershipPage = () => {
    return (
        <div className="mt-5 d-flex justify-content-around">
            <ChargerPartnershipForm/>
            <StationPartnershipForm/>
        </div>
    );
}

export default PartnershipPage;