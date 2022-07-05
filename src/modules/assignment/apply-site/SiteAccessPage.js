import SiteAccessCardView from "../../../components/CardView/SiteAccessCardView";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import InputTextBar from "../../../components/FormComponents/InputTextBar";
import { genGetDataById } from "../../../commons/GenericAction";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";

export default function SiteAccessPage() {
  const dispatch = useDispatch();
  const [items, setItem] = useState([]);

  //Paginator and Search States
  const [pageInputTooltip] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pageRows, setPageRows] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchSites, setSearchSites] = useState("");

  // Get data from DB
  const handleData = (currentPage) => {
    currentPage = currentPage - 1;
    dispatch(
      genGetDataById(
        `/api/tasklist/sites?page=` + currentPage + `&size=` + pageRows,
        (_respData) => {
          setItem(_respData.content);
          setTotalPages(_respData.totalPages);
          setTotalElements(_respData.totalElements);
          setCurrentPage(_respData.number + 1);
          console.info(`Data have been loaded successfully.`);
        }
      )
    );
  };

  useEffect(() => {
    handleData();
  }, [pageRows]);

  // Search logic
  const searchTasklist = (currentPage) => {
    currentPage = currentPage - 1;
    console.log("search this: " + searchSites);
    dispatch(
      genGetDataById(
        `/api/tasklist/sites?siteId=` +
          searchSites +
          `&page=` +
          currentPage +
          `&size=` +
          pageRows,
        (_respData) => {
          setItem(_respData.content);
          setTotalPages(_respData.totalPages);
          setTotalElements(_respData.totalElements);
          setCurrentPage(_respData.number + 1);
          console.info(`Search have been loaded successfully.`);
        }
      )
    );
  };

  const searchBoxSites = (e) => {
    setSearchSites(
      //assigning value to event target
      (e.target.name = e.target.value)
    );
  };

  const resetSearch = () => {
    setSearchSites("");
    handleData();
  };

  //Writing All the pagination functions
  //Show Next page
  const showNextPage = () => {
    if (currentPage < Math.ceil(totalElements / pageRows)) {
      if (!searchSites) {
        handleData(currentPage + 1);
      } else {
        searchTasklist(currentPage + 1);
      }
    }
  };

  //Show previous page
  const showPrevPage = () => {
    let prevPage = 1;
    if (currentPage > prevPage) {
      if (!searchSites) {
        handleData(currentPage - prevPage);
      } else {
        searchTasklist(currentPage - prevPage);
      }
    }
  };

  //Records Per Page Logic
  const onRecordsChange = (e) => {
    setPageRows(e.value);
    //Reset current page to 1 to show first page
    setCurrentPage(1);
    handleData(currentPage);
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
      <div className="pb-3">
        <div className="flex flex-inline gap-2 lg:grid-cols-4 grid-cols-2">
          <InputTextBar
            name="search"
            placeholder="Enter Site ID"
            value={searchSites}
            onChange={searchBoxSites}
          />
          <div className="lg:col-span-1 col-span-2 flex justify-end">
            <PrimaryButton name="search" onClick={searchTasklist}>
              Search
            </PrimaryButton>
            <PrimaryButton name="reset" onClick={resetSearch}>
              Reset
            </PrimaryButton>
          </div>
        </div>
        <label className="pt-8">Site ID Query Results</label>
        <div>
          {items.map((properties, index) => (
            <div key={index}>
              <SiteAccessCardView
                id={properties.id}
                siteId={properties.cd}
                vendor={properties.nm}
                eqpCount={properties.eqpCount}
              />
            </div>
          ))}
        </div>
        {/* Pagination here */}
        <div>
          <DataTable
            value={items}
            paginator
            paginatorTemplate={paginationTemplate}
          ></DataTable>
        </div>
      </div>
    </Fragment>
  );
}
