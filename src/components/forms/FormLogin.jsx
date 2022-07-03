import React, {useContext} from "react";
import AuthContext from "../../context/auth.context";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {MessageError, MessageLoading} from "../message";

const FormLogin = () => {
    const {login} = useContext(AuthContext);
    const {request, clearError, loading, error} = useHttp();
    const {t} = useTranslation();

    const initialValues = {email: "", password: ""};

    const onSubmit = async (values) => {
        try {
            const data = await request("http://localhost:8080/api/v1/authentication/login", "POST", {...values});
            login(data.id, data.token, data.role);
        } catch (e) {
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                email: Yup.string().required(t("form.yup.required")),
                password: Yup.string().required(t("form.yup.required"))
            })}
            onSubmit={onSubmit}
        >
            <Form className="form">
                <h3 className="form-title">
                    <span className="form-title-text">{t("form.name.login")}</span>
                </h3>
                {loading && <MessageLoading/>}
                {error && <MessageError error={error}/>}
                <div className="form-group">
                    <label htmlFor="inputEmail" className="form-label">{t("form.field.email")}</label>
                    <Field
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmail"
                        required
                    />
                    <ErrorMessage
                        name="email"
                        component="span"
                        className="form-error"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="form-label">{t("form.field.password")}</label>
                    <Field
                        type="password"
                        name="password"
                        className="form-control"
                        id="inputPassword"
                        required
                    />
                    <ErrorMessage
                        name="password"
                        component="span"
                        className="form-error"
                    />
                </div>
                <button
                    className="btn btn-submit"
                    type="submit"
                    onClick={clearError}
                >
                    {t("form.elements.buttons.login")}
                </button>
            </Form>
        </Formik>
    );
}

export default FormLogin;