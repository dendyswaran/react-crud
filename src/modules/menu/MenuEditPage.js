import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { genGetDataById } from "../../commons/GenericAction";
import Layout from "../../components/Layout";
import MenuForm from "./partial/MenuForm";

export default function MenuEditPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [initialValues, setInitialValues] = useState(null)

    useEffect(() => {
        dispatch(genGetDataById(
            `/api/menus/${id}`,
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
                    <MenuForm initialValues={initialValues} />}
            </div>
        </Layout>
    )
}