import React, {useCallback, useContext, useState} from "react";
import AuthContext from "../../context/auth.context";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";
import {MessageError, MessageLoading, MessageSuccess} from "../message";

const StationAddForm = () => {
    const [success, setSuccess] = useState(null);
    const {request, loading, clearError, error} = useHttp();
    const {t} = useTranslation();
    const {token} = useContext(AuthContext);

    const initialValues = {
        name: "",
        country: "",
        city: "",
        street: "",
        zipCode: 0,
        latitude: 0,
        longitude: 0,
        carName: "",
        carModel: "",
        allPlace: 0,
        freePlace: 0,
        middlePriceForPerHour: 0,
        timeFrom: "",
        timeTo: ""
    };

    const onSubmit = useCallback(async (values) => {
        try {
            const data = await request(`http://localhost:8080/api/v1/stations/users/current/create`, "POST", {...values}, {
                Authorization: `Bearer ${token}`
            });
            setSuccess(data.message);
        } catch (e) {
        }
    }, [token, request]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm(initialValues);
            }}
        >
            <Form className="form">
                {success && <MessageSuccess success={success}/>}
                {loading && <MessageLoading/>}
                {error && <MessageError error={error}/>}
                <div className="form-group">
                    <label htmlFor="inputName" className="form-label">{t("form.field.name")}</label>
                    <Field
                        type="text"
                        name="name"
                        className="form-control"
                        id="inputName"
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
                        <label htmlFor="inputCarName" className="form-label">{t("form.field.carName")}</label>
                        <Field
                            type="text"
                            name="carName"
                            className="form-control"
                            id="inputCarName"
                            required
                        />
                    </div>
                    <div className="form-group" style={{"flex": "1"}}>
                        <label htmlFor="inputCarModel" className="form-label">{t("form.field.carModel")}</label>
                        <Field
                            type="text"
                            name="carModel"
                            className="form-control"
                            id="inputCarModel"
                            required
                        />
                    </div>
                </div>
                <div className="form-subgroup">
                    <div className="form-group">
                        <label htmlFor="inputAllPlace" className="form-label">{t("form.field.allPlace")}</label>
                        <Field
                            type="number"
                            name="allPlace"
                            className="form-control"
                            id="inputAllPlace"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputFreePlace" className="form-label">{t("form.field.freePlace")}</label>
                        <Field
                            type="number"
                            name="freePlace"
                            className="form-control"
                            id="inputFreePlace"
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputMiddlePriceForPerHour" className="form-label">{t("form.field.price")}</label>
                    <Field
                        type="number"
                        name="middlePriceForPerHour"
                        className="form-control"
                        id="inputMiddlePriceForPerHour"
                        required
                    />
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
                    onClick={() => {
                        clearError();
                        setSuccess(null);
                    }}
                >
                    {t("buttons.submit")}
                </button>
            </Form>
        </Formik>
    );
}

export default StationAddForm;