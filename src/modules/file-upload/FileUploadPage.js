import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FileUploadedCardView from "../../components/CardView/FileUploadedCardView"
import FileUploaderPanel from "../../components/FormComponents/FileUploaderPanel"
import { DataTable } from "primereact/datatable";
import { Fragment } from "react";
import { genGetDataById } from "../../commons/GenericAction";
import { Dropdown } from "primereact/dropdown";
import InputLabel from "../../components/FormComponents/InputLabel";
import InputTextBar from "../../components/FormComponents/InputTextBar";
import { InputText } from "primereact/inputtext";

export default function FileUploadPage() {
  //Paginator States
  const [totalPages, setTotalPages] = useState(0);
  const [pageRows, setPageRows] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  //Fetch data through REST API
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [pageInputTooltip] = useState("");

    // Get data from DB
    //To be updated: Change API path once File Upload API is ready
    const handleData = (currentPage) => {
      currentPage = currentPage - 1;
      dispatch(
        genGetDataById(
          `/api/tasklist/sites?page=` + currentPage + `&size=` + pageRows,
          (_respData) => {
            setFiles(_respData.content);
            setTotalPages(_respData.totalPages);
            setTotalElements(_respData.totalElements);
            setCurrentPage(_respData.number + 1);
            console.info(`Data have been loaded successfully.`);
          }
        )
      );
    };

    useEffect(() => {
      handleData(currentPage);
    }, [pageRows]);

  //Format Date Display
  function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString('en-US',options);
  }

  //Records Per Page Logic
  const onRecordsChange = (e) => {
    setPageRows(e.value);
    //Reset current page to 1 to show first page
    setCurrentPage(1);
    handleData(currentPage);
  };

  //Show Next page
  const showNextPage = () => {
    if (currentPage < Math.ceil(totalElements / pageRows)) {
        handleData(currentPage + 1);
    }
  };

  //Show previous page
  const showPrevPage = () => {
    let prevPage = 1;
    if (currentPage > prevPage) {
        handleData(currentPage - prevPage);
    }
  };

  const onPageInputChange = (e) => {
    setCurrentPage(e.target.value);
  };

  const onPageInputKeyDown = (e, recordOptions) => {
    if (e.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 1 || page > totalPages) {
        console.log("Invalid Page number: ");
        //setPageInputTooltip(`Value must be between 1 and ${totalPages}.`);
      } else {
        setCurrentPage(currentPage);
        handleData(currentPage);
      }
    }
  };

  const paginationTemplate = {
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={showPrevPage}
          disabled={currentPage === 1 ? true : false}
        >
          <i className="pi pi-angle-left"></i>
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={showNextPage}
          disabled={currentPage === totalPages ? true : false}
        >
          <i className="pi pi-angle-right"></i>
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownRecordsOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 30, value: 30 },
      ];

      return (
        <Fragment>
          <span
            className="mx-1"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Items per page:{" "}
          </span>
          <Dropdown
            value={pageRows}
            options={dropdownRecordsOptions}
            onChange={onRecordsChange}
            optionLabel="label"
            placeholder="5"
          />
        </Fragment>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className="mx-3"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Go to{" "}
          <InputText
            size="2"
            className="ml-1"
            value={currentPage}
            tooltip={pageInputTooltip}
            onKeyDown={(e) => onPageInputKeyDown(e, options)}
            onChange={onPageInputChange}
          />
          <span> of {totalPages} pages</span>
        </span>
      );
    },
  };

    return (
        <Fragment>
        <div>
              <FileUploaderPanel></FileUploaderPanel>
              {files.map((properties) => (
              <FileUploadedCardView
              key={properties.id}
              href={`/file-upload`}
              primary={properties.cd}
              secondary="SITE ID"
              data={["By " + properties.createdBy, formatDate(properties.dtDecom)]}/>))}
        </div>
        <div>
          <DataTable
            value={files}
            paginator
            paginatorTemplate={paginationTemplate}
          ></DataTable>
        </div>
        </Fragment>
    )
}