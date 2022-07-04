import React, {useCallback, useContext, useState} from "react";
import AuthContext from "../../context/auth.context";
import {useHttp} from "../../hooks";
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";
import {MessageError, MessageLoading, MessageSuccess} from "../message";

const StationChangeFreePlaces = () => {
    const [success, setSuccess] = useState("");
    const {token} = useContext(AuthContext);
    const {request, loading, error, clearError} = useHttp();
    const {t} = useTranslation();

    const initialValues = {name: "", freePlace: 0};

    const onSubmit = useCallback(async (values) => {
        try {
            const data = await request(`http://localhost:8080/api/v1/stations/${values.name}/free-place`, "PATCH", {freePlace: values.freePlace}, {
                Authorization: `${token}`
            });
            setSuccess(data.message);
        } catch (e) {
        }
    }, [token, request]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form className="form" style={{marginTop: "25px"}}>
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

export default StationChangeFreePlaces;