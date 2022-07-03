import React from "react";
import {FormLogin} from "../../forms";

const LoginPage = () => {
    return (
        <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "marginTop": "50px"}}>
            <FormLogin/>
        </div>
    );
}

export default LoginPage;