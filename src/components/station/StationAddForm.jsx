import React, {useCallback, useContext} from "react";
import AuthContext from "../../context/auth.context";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";

const StationAddForm = () => {
    const {token, email} = useContext(AuthContext);
    const {request} = useHttp();
    const {t} = useTranslation();

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
            await request(`http://localhost:8080/api/v1/stations/create/by/station/users/${email}`, "POST", {...values}, {
                Authorization: `${token}`
            });
        } catch (e) {
        }
    }, [email, token, request]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm({
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
                });
            }}
        >
            <Form className="d-flex flex-column" style={{marginTop: "25px"}}>
                <div className="mb-2">
                    <label htmlFor="inputName" className="form-label">{t("form.field.name")}</label>
                    <Field
                        type="text"
                        name="name"
                        className="form-control"
                        id="inputName"
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
                        <label htmlFor="inputCarName" className="form-label">{t("form.field.carName")}</label>
                        <Field
                            type="text"
                            name="carName"
                            className="form-control"
                            id="inputCarName"
                            required
                        />
                    </div>
                    <div style={{marginRight: "5px"}} className="flex-fill">
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
                <div className="mb-2 d-flex">
                    <div style={{marginRight: "5px"}}>
                        <label htmlFor="inputAllPlace" className="form-label">{t("form.field.allPlace")}</label>
                        <Field
                            type="number"
                            name="allPlace"
                            className="form-control"
                            id="inputAllPlace"
                            required
                        />
                    </div>
                    <div>
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
                <div className="mb-2">
                    <label htmlFor="inputMiddlePriceForPerHour" className="form-label">{t("form.field.price")}</label>
                    <Field
                        type="number"
                        name="middlePriceForPerHour"
                        className="form-control"
                        id="inputMiddlePriceForPerHour"
                        required
                    />
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

export default StationAddForm;