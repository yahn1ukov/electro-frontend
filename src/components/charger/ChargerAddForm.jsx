import React, {useCallback, useContext} from "react";
import AuthContext from "../../context/auth.context";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

const ChargerAddForm = () => {
    const {token, email} = useContext(AuthContext);
    const {request} = useHttp();
    const {t} = useTranslation();

    const initialValues = {
        code: "",
        country: "",
        city: "",
        street: "",
        zipCode: 0,
        latitude: 0,
        longitude: 0,
        isFast: false,
        isPay: false,
        priceOfPerHour: 0,
        typeConnector: "",
        timeFrom: "",
        timeTo: ""
    };

    const onSubmit = useCallback(async (values) => {
        try {
            await request(`http://localhost:8080/api/v1/chargers/create/by/charger/users/${email}`, "POST", {...values}, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [email, token, request]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                code: Yup.string().required(t("form.yup.required")),
                country: Yup.string().required(t("form.yup.required")),
                city: Yup.string().required(t("form.yup.required")),
                street: Yup.string().required(t("form.yup.required")),
                zipCode: Yup.number().required(t("form.yup.required")),
                latitude: Yup.number().required(t("form.yup.required")),
                longitude: Yup.number().required(t("form.yup.required")),
                isFast: Yup.boolean().required(t("form.yup.required")),
                isPay: Yup.boolean().required(t("form.yup.required")),
                priceOfPerHour: Yup.number().required(t("form.yup.required")),
                typeConnector: Yup.string().required(t("form.yup.required")),
                timeFrom: Yup.string().required(t("form.yup.required")),
                timeTo: Yup.string().required(t("form.yup.required"))
            })}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm({
                    code: "",
                    country: "",
                    city: "",
                    street: "",
                    zipCode: 0,
                    latitude: 0,
                    longitude: 0,
                    isFast: false,
                    isPay: false,
                    priceOfPerHour: 0,
                    typeConnector: "",
                    timeFrom: "",
                    timeTo: ""
                });
            }}
        >
            <Form className="d-flex flex-column" style={{marginTop: "25px"}}>
                <div className="mb-2">
                    <label htmlFor="inputCode" className="form-label">{t("form.field.code")}</label>
                    <Field
                        type="text"
                        name="code"
                        className="form-control"
                        id="inputCode"
                        required
                    />
                </div>
                <div className="mb-2 d-flex">
                    <div style={{marginRight: "5px"}}>
                        <label htmlFor="inputCountry" className="form-label">{t("form.field.country")}</label>
                        <Field
                            type="text"
                            name="country"
                            className="form-control"
                            id="inputCountry"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="inputCity" className="form-label">{t("form.field.city")}</label>
                        <Field
                            type="text"
                            name="city"
                            className="form-control"
                            id="inputCity"
                            required
                        />
                    </div>
                </div>
                <div className="mb-2 d-flex">
                    <div style={{marginRight: "5px"}}>
                        <label htmlFor="inputStreet" className="form-label">{t("form.field.street")}</label>
                        <Field
                            type="text"
                            name="street"
                            className="form-control"
                            id="inputStreet"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="inputZipCode" className="form-label">{t("form.field.zipCode")}</label>
                        <Field
                            type="number"
                            name="zipCode"
                            className="form-control"
                            id="inputZipCode"
                            required
                        />
                    </div>
                </div>
                <div className="mb-2 d-flex">
                    <div style={{marginRight: "5px"}}>
                        <label htmlFor="inputLatitude" className="form-label">{t("form.field.latitude")}</label>
                        <Field
                            type="number"
                            name="latitude"
                            className="form-control"
                            id="inputLatitude"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="inputLongitude" className="form-label">{t("form.field.longitude")}</label>
                        <Field
                            type="number"
                            name="longitude"
                            className="form-control"
                            id="inputLongitude"
                            required
                        />
                    </div>
                </div>
                <div className="mb-2 d-flex">
                    <div style={{marginRight: "5px"}} className="flex-fill">
                        <label htmlFor="inputIsFast" className="form-label">{t("form.field.isFast")}</label>
                        <Field
                            as="select"
                            name="isFast"
                            className="form-select"
                            id="inputIsFast"
                            required
                        >
                            <option value={true}>{t("form.field.true")}</option>
                            <option value={false}>{t("form.field.false")}</option>
                        </Field>
                    </div>
                    <div className="flex-fill">
                        <label htmlFor="inputIsPay" className="form-label">{t("form.field.isPay")}</label>
                        <Field
                            as="select"
                            name="isPay"
                            className="form-select"
                            id="inputIsPay"
                            required
                        >
                            <option value={true}>{t("form.field.true")}</option>
                            <option value={false}>{t("form.field.false")}</option>
                        </Field>
                    </div>
                </div>
                <div className="mb-2 d-flex">
                    <div className="flex-fill" style={{marginRight: "5px"}}>
                        <label htmlFor="inputPriceOfPerHour"
                               className="form-label">{t("form.field.price")}</label>
                        <Field
                            type="number"
                            name="priceOfPerHour"
                            className="form-control"
                            id="inputPriceOfPerHour"
                            required
                        />
                    </div>
                    <div className="flex-fill">
                        <label htmlFor="inputTypeConnector"
                               className="form-label">{t("form.field.typeConnector")}</label>
                        <Field
                            type="text"
                            name="typeConnector"
                            className="form-control"
                            id="inputTypeConnector"
                            required
                        />
                    </div>
                </div>
                <div className="mb-2 d-flex">
                    <div style={{marginRight: "5px"}}>
                        <label htmlFor="inputTimeFrom" className="form-label">{t("form.field.timeFrom")}</label>
                        <Field
                            type="text"
                            name="timeFrom"
                            className="form-control"
                            id="inputTimeFrom"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="inputTimeTo" className="form-label">{t("form.field.timeTo")}</label>
                        <Field
                            type="text"
                            name="timeTo"
                            className="form-control"
                            id="inputTimeTo"
                            required
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
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

export default ChargerAddForm;