import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React, {useState} from "react";

const RegistrationForm = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const {request, clearError, loading} = useHttp();
    const {t} = useTranslation();

    const initialValues = {email: "", firstName: "", lastName: "", password: ""};

    const onSubmit = async (values) => {
        try {
            await request("http://localhost:8080/api/v1/auth/register/user", "POST", {...values});
            setSuccess(t("form.message.success"));
        } catch (e) {
            setError(t("form.message.error"));
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
            onSubmit={onSubmit}
        >
            <Form className="d-flex flex-column">
                <h3 className="form-title">
                    <span className="form-title-text">{t("form.name.registration")}</span>
                </h3>
                {
                    success &&
                    <p style={{textAlign: "center", border: "1px solid green", borderRadius: "5px"}}>
                        <span style={{color: "green"}}>{success}</span>
                    </p>
                }
                {
                    loading &&
                    <p style={{textAlign: "center", border: "1px solid #ced4da", borderRadius: "5px"}}>
                        <span style={{color: "#ced4da"}}>{t("form.message.loading")}</span>
                    </p>
                }
                {
                    error &&
                    <p style={{textAlign: "center", border: "1px solid red", borderRadius: "5px"}}>
                        <span style={{color: "red"}}>{error}</span>
                    </p>
                }
                <div className="mb-2">
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
                        style={{"color": "red"}}
                    />
                </div>
                <div className="mb-2">
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
                        style={{"color": "red"}}
                    />
                </div>
                <div className="mb-2">
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
                        style={{"color": "red"}}
                    />
                </div>
                <div className="mb-2">
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
                        style={{"color": "red"}}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={clearError}
                >
                    {t("form.elements.buttons.registration")}
                </button>
            </Form>
        </Formik>
    );
}

export default RegistrationForm;