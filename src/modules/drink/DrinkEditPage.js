import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { genGetDataById } from "../../commons/GenericAction";
import Layout from "../../components/Layout";
import DrinkForm from "./partial/DrinkForm";

export default function DrinkEditPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [initialValues, setInitialValues] = useState(null)

    useEffect(() => {
        dispatch(genGetDataById(
            `/api/drinks/${id}`,
            (_respData) => {
                /** on success */
                setInitialValues(_respData)
            }
        ))
    }, [id])

    return (
        <Layout>
            <div className="p-3">
                {initialValues &&
                    <DrinkForm initialValues={initialValues} />}
            </div>
        </Layout>
    )
}