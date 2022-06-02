import { useFormik } from "formik";
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genCreateData, genUpdateData } from "../../../commons/GenericAction";
import InputLabel from "../../../components/FormComponents/InputLabel";
import { FORM_OP } from "../../../configs/constant";


export default function FileUploadForm({ initialValues }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formOperation, setFormOperation] = useState(FORM_OP.CREATE)
    const formik = useFormik({
        initialValues: {
            id: null,
            name: ""
        },

        onSubmit: values => {
            switch (formOperation) {
                case FORM_OP.CREATE:
                    dispatch(genCreateData(
                        `/api/file-upload`,
                        values,
                        handleSubmitSuccess
                    ))

                    break
                case FORM_OP.EDIT:
                    dispatch(genUpdateData(
                        `/api/file-upload/${initialValues.id}`,
                        values,
                        handleSubmitSuccess
                    ))

                    break
            }

        }
    })

    const toastRef = useRef()
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const handleBeforeSubmit = (e) => {
        e.preventDefault()
        setShowConfirmDialog(true)
    }

    const handleSubmit = () => formik.submitForm()

    const handleSubmitSuccess = (result) => {
        if (formOperation === FORM_OP.CREATE)
            formik.resetForm()

        toastRef.current.show({ severity: 'success', summary: 'Success Message', detail: result.message || "Data has been saved!", life: 3000 });
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

                <div className="flex">
                    <Button label="Save" />
                    <Button label="Cancel" type="button" className="p-button-secondary ml-2" onClick={() => navigate("/file-upload")} />
                </div>
            </form>
        </div>
    )
}