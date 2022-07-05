import WarehouseCardView from "../../../components/CardView/WarehouseCardView";
import CheckboxMain from "../../../components/FormComponents/CheckboxMain";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { genGetDataById } from "../../../commons/GenericAction";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import InputTextBar from "../../../components/FormComponents/InputTextBar";
import { Fragment } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";

// to include checkboxes, pagination, and searching in WarehouseCardView
export default function WarehouseAssignDetails() {
  const dispatch = useDispatch();
  const [items, setItem] = useState([]);

  //Paginator and Search States
  const [pageInputTooltip] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pageRows, setPageRows] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchSites, setSearchSites] = useState("");
  const [searchPostcode, setPostcode] = useState("");

  // TODO: place this func under TasklistAction. How?
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
    handleData(currentPage);
  }, [pageRows]);

  const searchBoxSites = (e) => {
    setSearchSites(
      //assigning value to event target
      (e.target.name = e.target.value)
    );
  };

  // Search logic based on siteID
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

  // reset to default page
  const resetSearch = () => {
    setSearchSites("");
    handleData();
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelectSites") {
      let tempItem = items.map((props) => {
        return { ...props, isChecked: checked };
      });
      setItem(tempItem);
      console.log(tempItem);
    } else {
      let tempItem = items.map((props) =>
        props.cd === name ? { ...props, isChecked: checked } : props
      );
      setItem(tempItem);
      console.log(tempItem);
    }
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
    <div className="pb-3">
      <div className="flex flex-inline gap-2 grid-cols-2">
        <InputTextBar
          name="search"
          placeholder="Enter Site ID"
          value={searchSites}
          onChange={searchBoxSites}
        />
        <InputTextBar
          name="search"
          placeholder="Enter Postcode"
          /* value={searchPostcode}
          onChange={searchBoxPostcode} */
        />
      </div>

      <div className="lg:col-span-1 col-span-2 flex justify-end">
        <PrimaryButton name="search" onClick={searchTasklist}>
          Search
        </PrimaryButton>
        <PrimaryButton name="reset" onClick={resetSearch}>
          Reset
        </PrimaryButton>
      </div>

      <label className="pt-8">Site ID Query Results</label>

      <div>
        <div className="flex pt-1">
          <CheckboxMain
            name="allSelectSites"
            className="mr-2"
            checked={!items.some((props) => props?.isChecked !== true)}
            onChange={handleCheckboxChange}
          />
          <label className="pt-1">Select All</label>
        </div>
        {items.map((properties, index) => (
          <div key={index} className="flex in-line">
            <CheckboxMain
              className="mr-2 pt-5"
              name={properties.cd}
              value={properties.cd}
              checked={properties?.isChecked || false}
              onChange={handleCheckboxChange}
            />
            <WarehouseCardView key={properties.key} item={properties} />
          </div>
        ))}

        {/* Pagination here */}
        <DataTable
          value={items}
          paginator
          paginatorTemplate={paginationTemplate}
        ></DataTable>
      </div>
    </div>
  );
}
