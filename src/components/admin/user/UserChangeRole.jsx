import React, {useContext, useCallback} from "react";
import AuthContext from "../../../context/auth.context";
import {useHttp} from "../../../hooks";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";


const UserChangeRole = () => {
    const {token} = useContext(AuthContext);
    const {request} = useHttp();
    const {t} = useTranslation();

    const initialValues = {email: "", role: "ADMIN"};

    const onSubmit = useCallback(async (values) => {
        try {
            await request(`http://localhost:8080/api/v1/admins/change/role/users/${values.email}`, "PATCH", {role: values.role}, {
                Authorization: `${token}`
            });
        } catch (e) {}
        finally {
        }
    }, [token, request]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm({email: "", role: "ADMIN"});
            }}
        >
            <Form className="d-flex align-items-end" style={{marginTop: "5px"}}>
                <div style={{marginRight: "5px"}}>
                    <label htmlFor="inputEmail" className="form-label">{t("form.field.email")}</label>
                    <Field
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmail"
                        required
                    />
                </div>
                <div style={{marginRight: "5px"}}>
                    <label htmlFor="inputRole" className="form-label">{t("form.field.role")}</label>
                    <Field
                        as="select"
                        name="role"
                        className="form-select"
                        id="inputRole">
                        <option value="ADMIN">ADMIN</option>
                        <option value="MODERATOR">MODERATOR</option>
                    </Field>
                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        {t("buttons.submit")}
                    </button>
                </div>
            </Form>
        </Formik>
    );
}

export default UserChangeRole;