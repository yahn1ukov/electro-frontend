import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React, {useState} from "react";
import {MessageError, MessageLoading, MessageSuccess} from "../message";

const FormRegistration = () => {
    const [success, setSuccess] = useState(null);
    const {request, clearError, loading, error} = useHttp();
    const {t} = useTranslation();

    const initialValues = {email: "", firstName: "", lastName: "", password: ""};

    const onSubmit = async (values) => {
        try {
            const data = await request("http://localhost:8080/api/v1/authentication/registration/users", "POST", {...values});
            setSuccess(data.message);
        } catch (e) {
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                email: Yup.string().required(t("form.yup.required")),
                firstName: Yup.string().required(t("form.yup.required")),
                lastName: Yup.string().required(t("form.yup.required")),
                password: Yup.string().required(t("form.yup.required"))
            })}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm(initialValues);
            }}
        >
            <Form className="form">
                <h3 className="form-title">
                    <span className="form-title-text">{t("form.name.registration")}</span>
                </h3>
                {success && <MessageSuccess success={success}/>}
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
                    <label htmlFor="inputFirstName" className="form-label">{t("form.field.firstName")}</label>
                    <Field
                        type="text"
                        name="firstName"
                        className="form-control"
                        id="inputFirstName"
                        required
                    />
                    <ErrorMessage
                        name="firstName"
                        component="span"
                        className="form-error"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputLastName" className="form-label">{t("form.field.lastName")}</label>
                    <Field
                        type="text"
                        name="lastName"
                        className="form-control"
                        id="inputLastName"
                        required
                    />
                    <ErrorMessage
                        name="lastName"
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
                    onClick={() => {
                        clearError();
                        setSuccess(null);
                    }}
                >
                    {t("form.elements.buttons.registration")}
                </button>
            </Form>
        </Formik>
    );
}

export default FormRegistration;