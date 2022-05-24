import React, {useEffect, useRef, useState} from 'react';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {useDispatch, useSelector} from "react-redux";
import {Column} from 'primereact/column'
import {DataTable} from "primereact/datatable";
import {Toast} from 'primereact/toast';
import {MANAGE_USER_ACTION} from "../configs/ManageUser.constant";
import {useNavigate} from "react-router-dom";
import {genBulkDeleteData, genDeleteData, genFetchDatatable} from "../../../commons/GenericAction";
import {HeaderBasic} from "../../../components/DatatableView";
import Layout from "../../../components/Layout";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Dialog} from 'primereact/dialog';
import EditUserPage, {EditUserPageWrapped} from "./EditUserPage";

const ManageUserTable = () => {

    const {datatable} = useSelector(state => state.ManageUserReducer);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [tableSelection, setTableSelection] = useState(null);
    const [tableFilters, setTableFilters] = useState(null);
    const [deleteRowId, setDeleteRowId] = useState(null);
    const [userId, setUserId] = useState(-1);
    const [tableData, setTableData] = useState({
        content: [],
        totalElements: 0
    });
    const [tableParams, setTableParams] = useState({
        page:0,
        length: 10,
        first: 0
    });

    const toastRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dialogVisibility, setDialogVisibility] = useState(false);



    const handleFilterChange = (filter) => {
        const idValue = filter.filters['id']?.value;
        const idMode = filter.filters['id']?.matchMode;

        const usernameValue = filter.filters['username']?.value;
        const usernameMode = filter.filters['username']?.matchMode;

        const userEmailValue = filter.filters['email']?.value;
        const userEmailMode = filter.filters['email']?.matchMode;


        const filterObject = {
            'id': {
                value: idValue && idValue>0 ? Number(idValue) : null,
                matchMode: idMode || FilterMatchMode.EQUALS,
                type: "numeric",},
            'username': {
                value: usernameValue || '',
                matchMode: usernameMode || FilterMatchMode.CONTAINS,
                type: 'string',},
            'email': {
                value: userEmailValue ? userEmailValue : '',
                matchMode: userEmailMode || FilterMatchMode.CONTAINS,
                type: 'string',}
        }
        setTableFilters(filterObject);
        handleFetchDataTable(filterObject);
    }

    const handleFetchDataTable = (filters) => {
        dispatch(genFetchDatatable("/api/manage-user/datatable",
            {
                tableParams,
                dtSearch: filters ? filters : null
            },
            MANAGE_USER_ACTION.MANAGE_USER_SUCCESS));
    }

    const handlePageChange = ({length, page, first}) => {
        setTableParams((prevState) => (
            {
            length,
            page,
            first
        }));
    }

    const handleRowClicked = (opt) => {
        // navigate(`/user/edit/${opt.data.id}`);
    };

    useEffect(() => handleFetchDataTable, [tableParams]);

    useEffect(() => {
        setTableData({
            content: datatable?.content || [],
            totalElements: datatable?.totalElements || 0
        })
    }, [datatable]);


    /** Body Section
     * Anything related to body goes here
     */

    /**
     * Header for datatable
     * @returns {JSX.Element}
     */
    const renderHeader= () => {
        return (
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">User List</h3>
                <div className="flex justify-end">
                    <span className="p-input-icon-left mr-2">
                        <i className="pi pi-search" />
                        <InputText placeholder="Keyword Search" />
                    </span>
                    <Button label="Delete All" icon="pi pi-trash" className="p-button-danger" />
                </div>
            </div>
        );
    }

    const header = renderHeader();


    const manageUserButtons = (rowData) => {
        return(
            <div>
                <Button label="Delete" icon="pi pi-trash" iconPos="left" onClick={handleBeforeDelete} id={rowData.id}
                        className="p-button-danger mr-2 uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" />
                <Button label="Edit" icon="pi pi-pencil" iconPos="left" onClick={showEditDialog} id={rowData.id}
                        className="p-button-help mr-2 uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" />
            </div>
        );
    }

    const showEditDialog = (e) => {
        setDialogVisibility(true);
        setUserId(e.currentTarget.id);
        // navigate("/manage-user/edit/"+e.currentTarget.id);
    }

    const handleBeforeDelete = (e) => {
        if(e.currentTarget.id &&  e.currentTarget.id > 0) {
            setShowDeleteDialog(true);
            setDeleteRowId(e.currentTarget.id)
        }
    }

    const handleDeleteUser = () => {
        // console.log(e);
        if(deleteRowId && deleteRowId > 0) {
            dispatch(genDeleteData('api/manage-user',
                deleteRowId,
                (result) => {
                    toastRef.current.show({ severity: 'success', summary: 'Success Message', detail: result.message || "Data has been deleted!", life: 3000 });
                    handleFetchDataTable(tableFilters);
                }
            ));
        }
    }

    const renderFooter = () => {
        return(
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => setDialogVisibility(false)} className="p-button-text" />
            </div>
        );
    }

    const renderEditContent = () => {
        return (
            <div>
                <EditUserPage userId={userId} />
            </div>
        );
    }

    useEffect(() => {
    }, [userId])

    /**
     * Content that related to body ends here
     */

    // datatable default sortable are not compatible with lazy load on
    // onSort must be included with lazy
    return(
        <div className="pl-4">
            <Toast position='top-center' ref={toastRef}/>

            <Dialog header="Header" visible={dialogVisibility} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => setDialogVisibility(false)}>
               {renderEditContent()}
            </Dialog>


            <ConfirmDialog visible={showDeleteDialog} onHide={()=> setShowDeleteDialog(false)} message="Are you sure you want to delete this user?"
            header="Confirmation" icon="pi pi-exclamation-triangle" reject={() => { setDeleteRowId(undefined) }} accept={handleDeleteUser}/>
            <div className="container mt-10">
                <DataTable
                    paginator
                    paginatorTemplate="CurrentPageReport FistPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    selection={tableSelection}
                    rows={10}
                    dataKey="id"
                    filters={tableFilters}
                    filterDisplay="row"
                    lazy
                    totalRecords={tableData.totalElements}
                    first={tableParams.first}
                    header={header}
                    value={tableData.content}
                    onPage={handlePageChange}
                    onFilter={handleFilterChange}
                    onRowClick={handleRowClicked}
                    onSelectionChange={e => setTableSelection(e.value)}
                    globalFilterFields={['id', 'username', 'email']}
                    emptyMessage="No user has been registered"
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{width: '3em'}}/>
                    <Column field='id'
                            header="User ID"
                            filter
                            filterField='id'
                            filterPlaceholder="Search by ID"
                            style={{width: '16em'}}
                            />
                    <Column field="username"  header="Username" filter filterField='username' filterPlaceholder="Search by username"/>
                    <Column field="email" header="Email" filter filterField='email' filterPlaceholder="Search by Email"/>
                    <Column header="Manage" body={manageUserButtons}/>
                    {/*<Column field=""*/}
                </DataTable>
            </div>
        </div>
    );
}

export default ManageUserTable;

