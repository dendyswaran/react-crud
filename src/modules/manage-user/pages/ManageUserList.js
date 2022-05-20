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

    /**
     * Header for datatable
     * @returns {JSX.Element}
     */
    const renderHeader= () => {
        return (
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">User List</h3>
                <label className="relative block">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        {/*<svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>*/}
                        <i className="pi pi-search ml-2"/>
                    </span>
                    <input
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="Search table" type="text" name="search"/>
                </label>
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
                    globalFilterFields={['id', 'username', 'email']}
                    emptyMessage="No user has been registered"
                    responsiveLayout="scroll"
                >
                    <Column selectionmode="multiple" headerStyle={{width: '3em'}}></Column>
                    <Column field='id' header="User ID" filter filterField="id" filterPlaceholder="Search by ID"></Column>
                    <Column field="username" sortable header="Username" filter filterField='username' filterPlaceholder="Search by username"></Column>
                    <Column field="email" header="Email" filter filterField='email' filterPlaceholder="Search by Email"></Column>
                    {/*<Column field=""*/}
                </DataTable>
            </div>
        </div>
    );
}

export default ManageUserList;

