import React, {useCallback, useContext, useState} from "react";
import AuthContext from "../../context/auth.context";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";
import {MessageError, MessageLoading, MessageSuccess} from "../message";

const ChargerAddForm = () => {
    const [success, setSuccess] = useState("");
    const {token, id} = useContext(AuthContext);
    const {request, loading, error, clearError} = useHttp();
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
            const data = await request(`http://localhost:8080/api/v1/chargers/users/${id}/create`, "POST", {...values}, {
                Authorization: `${token}`
            });
            setSuccess(data.message);
        } catch (e) {
        }
    }, [id, token, request]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form className="form">
                {success && <MessageSuccess success={success}/>}
                {loading && <MessageLoading/>}
                {error && <MessageError error={error}/>}
                <div className="form-group">
                    <label htmlFor="inputCode" className="form-label">{t("form.field.code")}</label>
                    <Field
                        type="text"
                        name="code"
                        className="form-control"
                        id="inputCode"
                        required
                    />
                </div>
                <div className="form-subgroup">
                    <div className="form-group">
                        <label htmlFor="inputCountry" className="form-label">{t("form.field.country")}</label>
                        <Field
                            type="text"
                            name="country"
                            className="form-control"
                            id="inputCountry"
                            required
                        />
                    </div>
                    <div className="form-group">
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
                <div className="form-subgroup">
                    <div className="form-group">
                        <label htmlFor="inputStreet" className="form-label">{t("form.field.street")}</label>
                        <Field
                            type="text"
                            name="street"
                            className="form-control"
                            id="inputStreet"
                            required
                        />
                    </div>
                    <div className="form-group">
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
                <div className="form-subgroup">
                    <div className="form-group">
                        <label htmlFor="inputLatitude" className="form-label">{t("form.field.latitude")}</label>
                        <Field
                            type="number"
                            name="latitude"
                            className="form-control"
                            id="inputLatitude"
                            required
                        />
                    </div>
                    <div className="form-group">
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
                <div className="form-subgroup">
                    <div className="form-group" style={{"flex": "1"}}>
                        <label htmlFor="inputIsFast" className="form-label">{t("form.field.isFast")}</label>
                        <Field
                            as="select"
                            name="isFast"
                            className="form-control"
                            id="inputIsFast"
                            required
                        >
                            <option value={true}>{t("form.field.true")}</option>
                            <option value={false}>{t("form.field.false")}</option>
                        </Field>
                    </div>
                    <div className="form-group" style={{"flex": "1"}}>
                        <label htmlFor="inputIsPay" className="form-label">{t("form.field.isPay")}</label>
                        <Field
                            as="select"
                            name="isPay"
                            className="form-control"
                            id="inputIsPay"
                            required
                        >
                            <option value={true}>{t("form.field.true")}</option>
                            <option value={false}>{t("form.field.false")}</option>
                        </Field>
                    </div>
                </div>
                <div className="form-subgroup">
                    <div className="form-group">
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
                    <div className="form-group">
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
                <div className="form-subgroup">
                    <div className="form-group">
                        <label htmlFor="inputTimeFrom" className="form-label">{t("form.field.timeFrom")}</label>
                        <Field
                            type="text"
                            name="timeFrom"
                            className="form-control"
                            id="inputTimeFrom"
                            required
                        />
                    </div>
                    <div className="form-group">
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
                <button
                    className="btn btn-submit"
                    type="submit"
                    onClick={clearError}
                >
                    {t("buttons.submit")}
                </button>
            </Form>
        </Formik>
    );
}

export default ChargerAddForm;