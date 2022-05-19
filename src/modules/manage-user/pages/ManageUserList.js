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
        rows: 10,
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
        const userEmailMode = filter.filters['email'].matchMode;

        const filterObject = {
            id: {value: idValue && idValue > 0 ? Number(idValue):null, matchMode: idMode || FilterMatchMode.EQUALS, type: "numeric" },
            username: {value: usernameValue && usernameValue || '', matchMode: usernameMode || FilterMatchMode.CONTAINS, type: 'string'},
            userEmail: {value: userEmailValue && userEmailValue || '', matchMode: userEmailMode || FilterMatchMode.CONTAINS, type: 'string'}
        }

        setTableFilters(filterObject);
        handleFetchDataTable(filterObject);
    }

    const handleFetchDataTable = (filters) => {
        dispatch(
            async(dispatch) => {
                try {
                    const {data:resp}
                }
            }
        );
    }

    const handlePageChange = ({rows, page, first}) => {
        setTableParams((prevState) => (
            {
            rows,
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
    }, [datatable])

    return(
        <div>
            <Toast position='top-center' ref={toastRef}/>
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
                header={<HeaderBasic disabled={!tableSelection || tableSelection.length === 0} />}
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
            </DataTable>
        </div>
    );
}

export default ManageUserList;

