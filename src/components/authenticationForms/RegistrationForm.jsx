import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React from "react";

const RegistrationForm = () => {
    const {request, clearError} = useHttp();
    const {t} = useTranslation();

    const initialValues = {email: "", fName: "", lName: "", password: ""};

    const onSubmit = async (values) => {
        try {
            await request("http://localhost:8080/api/v1/auth/register/user", "POST", {...values});
        } catch (e) {
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                email: Yup.string().required(t("form.yup.required")),
                fName: Yup.string().required(t("form.yup.required")),
                lName: Yup.string().required(t("form.yup.required")),
                password: Yup.string().required(t("form.yup.required"))
            })}
            onSubmit={onSubmit}
        >
            <Form className="d-flex flex-column">
                <h3 className="form-title">
                    <span className="form-title-text">{t("form.name.registration")}</span>
                </h3>
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
                    <label htmlFor="inputFirstName" className="form-label">{t("form.field.fName")}</label>
                    <Field
                        type="text"
                        name="fName"
                        className="form-control"
                        id="inputFirstName"
                        required
                    />
                    <ErrorMessage
                        name="fName"
                        component="span"
                        style={{"color": "red"}}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="inputLastName" className="form-label">{t("form.field.lName")}</label>
                    <Field
                        type="text"
                        name="lName"
                        className="form-control"
                        id="inputLastName"
                        required
                    />
                    <ErrorMessage
                        name="lName"
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