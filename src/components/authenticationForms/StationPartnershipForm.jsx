import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React from "react";

const StationPartnershipForm = () => {
    const {request, clearError} = useHttp();
    const {t} = useTranslation();

    const initialValues = {email: "", company: "", password: ""};

    const onSubmit = async (values) => {
        try {
            await request("http://localhost:8080/api/v1/auth/register/station/partner", "POST", {...values});
        } catch (e) {
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
                    <span className="form-title-text">{t("form.name.partnership.station")}</span>
                </h3>
                <div className="mb-2">
                    <label htmlFor="inputEmailStation" className="form-label">{t("form.field.email")}</label>
                    <Field
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmailStation"
                        required
                    />
                    <ErrorMessage
                        name="email"
                        component="span"
                        style={{"color": "red"}}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="inputCompanyStation" className="form-label">{t("form.field.company")}</label>
                    <Field
                        type="text"
                        name="company"
                        className="form-control"
                        id="inputCompanyStation"
                        required
                    />
                    <ErrorMessage
                        name="company"
                        component="span"
                        style={{"color": "red"}}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="inputPasswordStation" className="form-label">{t("form.field.password")}</label>
                    <Field
                        type="password"
                        name="password"
                        className="form-control"
                        id="inputPasswordStation"
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

export default StationPartnershipForm;