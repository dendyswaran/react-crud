import { Button } from "primereact/button"
import { useEffect } from "react"

export const HeaderBasic = ({ ...rest }) => {

    useEffect(() => {

    }, [])

    return (
        <div className="flex justify-end">
            <Button {...rest} label="Delete" icon="pi pi-trash" />
        </div>
    )
}