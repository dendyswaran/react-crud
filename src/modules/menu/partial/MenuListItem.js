import { Button } from "primereact/button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genBulkDeleteData, genGetDataById } from "../../../commons/GenericAction";
import useGenAction from "../../../commons/GenericState";
import { fetchMenuParents } from "../services/MenuAction";

export default function MenuListItem(node) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading } = useGenAction()

    const [showAction, setShowAction] = useState(false)
    const toggleShowAction = (_show) => {
        return () => setShowAction(_show)
    }

    let label = <span>{node.label}</span>;
    if (node.url) {
        label = <a href={node.url}>{node.label}</a>;
    }

    const handleDelete = () => {
        dispatch(genBulkDeleteData("/api/menus/bulk-delete", [Number(node.key)], (_respData) => {
            dispatch(fetchMenuParents())
        }))
    }

    const handleEdit = () => {
        navigate(`/settings/menu/${Number(node.key)}`)
    }

    return (
        <div className='flex items-center space-x-4' onMouseEnter={toggleShowAction(true)} onMouseLeave={toggleShowAction(false)}>
            <div className='flex'>
                {label}
            </div>

            {!isNaN(node.key) &&
                <React.Fragment>
                    <div className='flex space-x-1' style={{ visibility: showAction ? 'visible' : 'hidden' }}>
                        <Button disabled={isLoading} onClick={handleEdit} icon='pi pi-pencil' tooltip="Edit" className='p-button-rounded p-button-text' />
                        <Button disabled={isLoading} onClick={handleEdit} icon='pi pi-folder' tooltip="Add Submenu" className='p-button-rounded p-button-text' />
                        <Button disabled={isLoading} onClick={handleDelete} icon='pi pi-trash' tooltip="Delete" className='p-button-rounded p-button-text' />

                    </div>
                </React.Fragment>
            }
        </div>
    )
}