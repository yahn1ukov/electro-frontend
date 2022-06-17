import React, {useState} from "react";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

const ChargerPartnershipForm = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const {request, clearError, loading} = useHttp();
    const {t} = useTranslation();

    const initialValues = {email: "", company: "", password: ""};

    const onSubmit = async (values) => {
        try {
            await request("http://localhost:8080/api/v1/auth/register/charger/partner", "POST", {...values});
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
                company: Yup.string().required(t("form.yup.required")),
                password: Yup.string().required(t("form.yup.required"))
            })}
            onSubmit={onSubmit}
        >
            <Form className="d-flex flex-column">
                <h3 className="form-title">
                    <span className="form-title-text">{t("form.name.partnership.charger")}</span>
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
                    <label htmlFor="inputEmailCharger" className="form-label">{t("form.field.email")}</label>
                    <Field
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmailCharger"
                        required
                    />
                    <ErrorMessage
                        name="email"
                        component="span"
                        style={{"color": "red"}}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="inputCompanyCharger" className="form-label">{t("form.field.company")}</label>
                    <Field
                        type="text"
                        name="company"
                        className="form-control"
                        id="inputCompanyCharger"
                        required
                    />
                    <ErrorMessage
                        name="company"
                        component="span"
                        style={{"color": "red"}}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="inputPasswordCharger" className="form-label">{t("form.field.password")}</label>
                    <Field
                        type="password"
                        name="password"
                        className="form-control"
                        id="inputPasswordCharger"
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
                    {t("form.elements.buttons.partnership")}
                </button>
            </Form>
        </Formik>
    );
}

export default ChargerPartnershipForm;