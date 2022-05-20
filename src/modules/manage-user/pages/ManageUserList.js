import React, {useEffect, useRef, useState} from 'react';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {useDispatch, useSelector} from "react-redux";
import {Column} from 'primereact/column'
import {DataTable} from "primereact/datatable";
import {Toast} from 'primereact/toast';
import {MANAGE_USER_ACTION} from "../../../configs/constant";
import {useNavigate} from "react-router-dom";
import {genFetchDatatable} from "../../../commons/GenericAction";
import {HeaderBasic} from "../../../components/DatatableView";

const ManageUserList = () => {

    const {datatable} = useSelector(state => state.ManageUserReducer);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [tableSelection, setTableSelection] = useState(null);
    const [tableFilters, setTableFilters] = useState(null);
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

    const handleFilterChange = (filter) => {
        const idValue = filter.filters['id']?.value;
        const idMode = filter.filters['id']?.matchMode;

        const usernameValue = filter.filters['username']?.value;
        const usernameMode = filter.filters['username']?.matchMode;

        const userEmailValue = filter.filters['email']?.value;
        const userEmailMode = filter.filters['email']?.matchMode;

        const filterObject = {
            id: {value: idValue && idValue > 0 ? Number(idValue):null, matchMode: idMode || FilterMatchMode.EQUALS, type: "numeric" },
            username: {value: usernameValue && usernameValue || '', matchMode: usernameMode || FilterMatchMode.CONTAINS, type: 'string'},
            userEmail: {value: userEmailValue && userEmailValue || '', matchMode: userEmailMode || FilterMatchMode.CONTAINS, type: 'string'}
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
        navigate(`/user/edit/${opt.data.id}`);
    };

    useEffect(() => handleFetchDataTable, [tableParams]);

    useEffect(() => {
        setTableData({
            content: datatable?.content || [],
            totalElements: datatable?.totalElements || 0
        })
    }, [datatable]);

    const renderHeader= () => {
        return (
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">User List</h3>
                <span>
                    <i className="pi pi-search mr-4"/>
                    <input placeholder="Search" className="mr-3"/>
                </span>
            </div>
        );
    }

    const header = renderHeader();

    return(
        <div className="flex justify-center">
            <Toast position='top-center' ref={toastRef}/>
            <div className="container mt-10">
                <DataTable
                    paginator
                    paginatorTemplate="CurrentPageReport FistPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    dataKey="id"
                    selection={tableSelection}
                    rows={10}
                    totalRecords={tableData.totalElements}
                    first={tableParams.first}
                    filters={tableFilters}
                    lazy
                    header={header}
                    value={tableData.content}
                    onPage={handlePageChange}
                    onFilter={handleFilterChange}
                    onRowClick={handleRowClicked}
                    onSelectionChange={e => setTableSelection(e.value)}
                >
                    <Column selectionmode="multiple" headerStyle={{width: '3em'}}></Column>
                    <Column field='id' header="User ID" filter filterField="id" filterPlaceholder="Search by ID"></Column>
                    <Column field="username" header="Username" filter filterField='username' filterPlaceholder="Search by username"></Column>
                    <Column field="email" header="Email" filter filterField='email' filterPlaceholder="Search by Email"></Column>
                    {/*<Column field=""*/}
                </DataTable>
            </div>
        </div>
    );
}

export default ManageUserList;

