import React, {useState} from "react";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {MessageError, MessageLoading, MessageSuccess} from "../message";

const FormChargerPartnership = () => {
    const [success, setSuccess] = useState(null);
    const {request, clearError, loading, error} = useHttp();
    const {t} = useTranslation();

    const initialValues = {email: "", company: "", password: ""};

    const onSubmit = async (values) => {
        try {
            const data = await request("http://localhost:8080/api/v1/authentication/registration/users/chargers", "POST", {...values});
            setSuccess(data.message);
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
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm(initialValues);
            }}
        >
            <Form className="form">
                <h3 className="form-title">
                    <span className="form-title-text">{t("form.name.partnership.charger")}</span>
                </h3>
                {success && <MessageSuccess success={success}/>}
                {loading && <MessageLoading/>}
                {error && <MessageError error={error}/>}
                <div className="form-group">
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
                        className="form-error"
                    />
                </div>
                <div className="form-group">
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
                        className="form-error"
                    />
                </div>
                <div className="form-group">
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
                    {t("form.elements.buttons.partnership")}
                </button>
            </Form>
        </Formik>
    );
}

export default FormChargerPartnership;