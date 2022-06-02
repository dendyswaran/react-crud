import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { genBulkDeleteData, genFetchDatatable } from '../../../commons/GenericAction';
import { HeaderBasic } from '../../../components/DatatableView';
import { FILE_UPLOAD_ACTION } from '../../../configs/constant';

export default function FileUploadTable() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { datatable } = useSelector(state => state.FileUploadReducer)

    const toastRef = useRef()
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [tableParams, setTableParams] = useState({
        page: 0,
        length: 10,
        first: 0
    })

    const [tableSelection, setTableSelection] = useState(null)
    const [tableFilters, setTableFilters] = useState(null)
    const [tableData, setTableData] = useState({
        content: [],
        totalElements: 0
    })

    const handleFilterChange = (_filter) => {
        /** set the filter's default values */
        const idValue = _filter.filters['id']?.value
        const idMMode = _filter.filters['id']?.matchMode

        const nameValue = _filter.filters['name']?.value
        const nameMMode = _filter.filters['name']?.matchMode

        const filterObject = {
            id: { value: idValue && idValue > 0 ? Number(idValue) : null, matchMode: idMMode || FilterMatchMode.EQUALS, type: "numeric" },
            name: { value: nameValue || '', matchMode: nameMMode || FilterMatchMode.CONTAINS, type: "string" }
        }

        setTableFilters(filterObject)
        handleFetchDatatable(filterObject)
    }

    const handlePageChange = ({ rows, page, first }) => {
        setTableParams(_existing => ({
            rows,
            page,
            first
        }))
    }

    /**
     * 
     * @param {*} _filters 
     */
    const handleFetchDatatable = (_filters) => {
        dispatch(genFetchDatatable(
            `/api/file-upload/datatable`,
            {
                tableParams,
                dtSearch: _filters ? _filters : null
            },
            FILE_UPLOAD_ACTION.FILE_UPLOAD_DATATABLE_SUCCESS))
    }

    const handleBeforeBulkDelete = () => {
        setShowConfirmDialog(true)
    }

    const handleBulkDelete = () => [
        dispatch(genBulkDeleteData(
            `/api/file-upload/bulk-delete`,
            tableSelection.map(t => t.id),
            (result) => {
                /** on success */
                toastRef.current.show({ severity: 'success', summary: 'Success Message', detail: result.message || "Data has been deleted!", life: 3000 });
                handleFetchDatatable(tableFilters)
            }
        ))
    ]

    const handleRowClicked = (opt) => {
        navigate(`/file-upload/edit/${opt.data.id}`)
    }

    useEffect(() => handleFetchDatatable, [tableParams])

    /**
     * set table's data 
     */
    useEffect(() => {
        setTableData({
            content: datatable?.content || [],
            totalElements: datatable?.totalElements || 0
        })
    }, [datatable])


    return (
        <div className='flex flex-col'>
            <ConfirmDialog visible={showConfirmDialog} onHide={() => setShowConfirmDialog(false)} message="Are you sure you want to proceed?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={handleBulkDelete} reject={() => { }} />

            <Toast position='top-center' ref={toastRef} />

            <DataTable
                paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                dataKey="id"
                selection={tableSelection}
                rows={10}
                totalRecords={tableData.totalElements}
                first={tableParams.first}
                filterDisplay="row"
                filters={tableFilters}
                lazy
                header={<HeaderBasic disabled={!tableSelection || tableSelection.length === 0} onClick={handleBeforeBulkDelete} />}
                value={tableData.content}
                onPage={handlePageChange}
                onFilter={handleFilterChange}
                onRowClick={handleRowClicked}
                onSelectionChange={e => setTableSelection(e.value)}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column field='id' header="ID" filter filterField='id' filterPlaceholder="Search by id" />
                <Column field='name' header="Drink Name" filter filterField='name' filterPlaceholder="Search by name" />
            </DataTable>
        </div>
    )
}