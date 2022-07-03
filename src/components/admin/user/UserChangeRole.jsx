import React, {useCallback, useContext, useState} from "react";
import AuthContext from "../../../context/auth.context";
import {useHttp} from "../../../hooks";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";
import {MessageError, MessageLoading, MessageSuccess} from "../../message";

const UserChangeRole = () => {
    const [success, setSuccess] = useState("");
    const {token} = useContext(AuthContext);
    const {request, loading, error, clearError} = useHttp();
    const {t} = useTranslation();

    const initialValues = {email: "", role: "ADMIN"};

    const onSubmit = useCallback(async (values) => {
        try {
            const data = await request(`http://localhost:8080/api/v1/admins/users/${values.email}/role`, "PATCH", {role: values.role}, {
                Authorization: `${token}`
            });
            setSuccess(data.message);
        } catch (e) {
        }
    }, [token, request]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form className="form">
                {success && <MessageSuccess success={success}/>}
                {loading && <MessageLoading/>}
                {error && <MessageError error={error}/>}
                <div className="form-group" style={{marginRight: "5px"}}>
                    <label htmlFor="inputEmail" className="form-label">{t("form.field.email")}</label>
                    <Field
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmail"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputRole" className="form-label">{t("form.field.role")}</label>
                    <Field
                        as="select"
                        name="role"
                        className="form-control"
                        id="inputRole">
                        <option value="ADMIN">ADMIN</option>
                        <option value="MODERATOR">MODERATOR</option>
                    </Field>
                </div>
                <div>
                    <button
                        className="btn btn-submit"
                        type="submit"
                        onClick={clearError}
                    >
                        {t("buttons.submit")}
                    </button>
                </div>
            </Form>
        </Formik>
    );
}

export default UserChangeRole;