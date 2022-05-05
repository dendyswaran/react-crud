import { useFormik } from "formik";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genCreateData, genUpdateData } from "../../../commons/GenericAction";
import useGenAction from "../../../commons/GenericState";
import InputLabel from "../../../components/InputLabel";
import { E_MENU_CLICKEVENT, FORM_OP } from "../../../configs/constant";
import { fetchMenuParents } from "../services/MenuAction";

export default function MenuForm({initialValues}) {
    const navigate = useNavigate()
    const toastRef = useRef()
    const dispatch = useDispatch()
    const { isLoading } = useGenAction()

    const [formOperation, setFormOperation] = useState(FORM_OP.CREATE)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            priority: 0,
            href: "",
            clickEvent: E_MENU_CLICKEVENT[0].value,
            isActive: false
        },

        onSubmit: values => {

            switch (formOperation) {
                case FORM_OP.CREATE:
                    dispatch(genCreateData(
                        `/api/menus`,
                        values,
                        handleSubmitSuccess
                    ))

                    break
                case FORM_OP.EDIT:
                    dispatch(genUpdateData(
                        `/api/menus/${initialValues.id}`,
                        values,
                        handleSubmitSuccess
                    ))

                    break
            }
        }
    })

    const handleBeforeSubmit = (e) => {
        e.preventDefault()
        setShowConfirmDialog(true)
    }

    const handleSubmit = () => formik.submitForm()

    const handleSubmitSuccess = (result) => {
        if (formOperation === FORM_OP.CREATE)
            formik.resetForm()

        toastRef.current.show({ severity: 'success', summary: 'Success Message', detail: result.message || "Data has been saved!", life: 3000 });

        /** fetch menu */
        dispatch(fetchMenuParents())
    }


    useEffect(() => {
        if (initialValues) {
            formik.setValues(initialValues)
            setFormOperation(FORM_OP.EDIT)
        }
    }, [initialValues])

    return (
        <div className="flex flex-col max-w-sm">

            <ConfirmDialog visible={showConfirmDialog} onHide={() => setShowConfirmDialog(false)} message="Are you sure you want to proceed?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={handleSubmit} reject={() => { }} />

            <Toast position='top-center' ref={toastRef} />

            <form onSubmit={handleBeforeSubmit}>
                <InputLabel>Name</InputLabel>
                <InputText type="text" className="w-full mb-3"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange} />

                <InputLabel>Code</InputLabel>
                <InputText type="text" className="w-full mb-3"
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange} />

                <InputLabel>Link</InputLabel>
                <InputText type="text" className="w-full mb-3"
                    name="href"
                    value={formik.values.href}
                    onChange={formik.handleChange} />

                <InputLabel>On Click Event</InputLabel>
                <Dropdown className="w-full mb-3"
                    options={E_MENU_CLICKEVENT}
                    optionLabel="label"
                    optionValue="value"
                    value={formik.values.clickEvent}
                    name="clickEvent"
                    onChange={formik.handleChange} />

                <div className="flex">
                    <Button label="Save" disabled={isLoading} />
                    <Button label="Cancel" type="button" className="p-button-secondary ml-2" onClick={() => navigate("/settings/menu")} />
                </div>
            </form>
        </div>
    )
}