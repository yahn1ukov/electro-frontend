import React, {useCallback, useContext} from "react";
import AuthContext from "../../context/auth.context";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";

const StationChangeFreePlaces = () => {
    const {token} = useContext(AuthContext);
    const {request} = useHttp();
    const {t} = useTranslation();

    const initialValues = {name: "", freePlace: 0};

    const onSubmit = useCallback(async (values) => {
        try {
            await request(`http://localhost:8080/api/v1/stations/${values.name}/change/free-place`, "PATCH", {freePlace: values.freePlace}, {
                Authorization: `${token}`
            });
        } catch (e) {
        } finally {
        }
    }, [token, request]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm({name: "", freePlace: 0});
            }}
        >
            <Form className="d-flex align-items-end" style={{marginTop: "20px"}}>
                <div style={{marginRight: "5px"}}>
                    <label htmlFor="inputName" className="form-label">{t("form.field.name")}</label>
                    <Field
                        type="text"
                        name="name"
                        className="form-control"
                        id="inputName"
                        required
                    />
                </div>
                <div style={{marginRight: "5px"}}>
                    <label htmlFor="inputFreePlace" className="form-label">{t("form.field.freePlace")}</label>
                    <Field
                        type="number"
                        name="freePlace"
                        className="form-control"
                        id="inputFreePlace"
                        required
                    />
                </div>
                <div>
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

export default StationChangeFreePlaces;