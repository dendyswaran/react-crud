import Layout from "../../../components/Layout";
import { Dropdown } from "primereact/dropdown";
import InputLabel from "../../../components/FormComponents/InputLabel";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import CheckboxMain from "../../../components/FormComponents/CheckboxMain";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { genGetDataById } from "../../../commons/GenericAction";
import InputTextBar from "../../../components/FormComponents/InputTextBar";
import TeamAssignmentCardView from "../../../components/CardView/TeamAssignmentCardView";
import { DataTable } from "primereact/datatable";
import { Ripple } from "react";
import { Fragment } from "react";
import { InputText } from "primereact/inputtext";

export default function AssignTeamPage() {
  const teamItems = [
    { name: "Team 1", value: "1" },
    { name: "Team 2", value: "2" },
    { name: "Team 3", value: "3" },
    { name: "Team 4", value: "4" },
    { name: "Team 5", value: "5" },
    { name: "Team 6", value: "6" },
  ];

  //Assigning Team Logic
  const [selectedTeam, setSelectedTeam] = useState(null);

  const onTeamChange = (e) => {
    setSelectedTeam(e.value);
  };

  //Pagination Logic
  //Paginator and Search States
  const [totalPages, setTotalPages] = useState(0);
  const [pageRows, setPageRows] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchSites, setSearchSites] = useState("");
  const [pageInputTooltip] = useState("");

  const recordOptions = [
    { name: "5", value: "5" },
    { name: "10", value: "10" },
    { name: "20", value: "20" },
    { name: "30", value: "30" },
  ];

  //Records Per Page Logic
  const onRecordsChange = (e) => {
    setPageRows(e.value);
    //Reset current page to 1 to show first page
    setCurrentPage(1);
    handleData(currentPage);
  };

  //Fetch data through REST API
  const dispatch = useDispatch();
  const [sites, setSite] = useState([]);

  // Get data from DB
  const handleData = (currentPage) => {
    currentPage = currentPage - 1;
    dispatch(
      genGetDataById(
        `/api/tasklist/sites?page=` + currentPage + `&size=` + pageRows,
        (_respData) => {
          setSite(_respData.content);
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

  //Search Box Method
  const searchBox = (e) => {
    setSearchSites(
      //assigning value to event target
      (e.target.name = e.target.value)
    );
    //handleData(currentPage);
  };

  // Search logic
  const searchTasklist = (currentPage) => {
    currentPage = currentPage - 1;
    dispatch(
      genGetDataById(
        `/api/tasklist/sites?siteId=` +
          searchSites +
          `&page=` +
          currentPage +
          `&size=` +
          pageRows,
        (_respData) => {
          setSite(_respData.content);
          setTotalPages(_respData.totalPages);
          setTotalElements(_respData.totalElements);
          setCurrentPage(_respData.number + 1);
          console.info(`Search have been loaded successfully.`);
        }
      )
    );
  };

  //Reset Search Box
  const resetSearch = () => {
    setSearchSites("");
    handleData(currentPage);
  };

  //Checkbox handleChange Logic
  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      let tempItem = sites.map((props) => {
        return { ...props, isChecked: checked };
      });
      setSite(tempItem);
    } else {
      let tempItem = sites.map((props) =>
        props.cd === name ? { ...props, isChecked: checked } : props
      );
      setSite(tempItem);
    }
  };

  //Paginator States and onPageChange function
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

  const template2 = {
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
    <Layout>
      <div className="pb-3">
        <div className="flex flex-inline gap-2 grid-cols-3">
          <InputTextBar
            name="search"
            placeholder="Enter Site ID"
            value={searchSites}
            onChange={searchBox}
          />
          <InputTextBar
            name="search"
            placeholder="Enter Postcode"
            /* value={search}
          onChange={searchBox} */
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
        <div className="flex pt-8">
          <CheckboxMain
            name="allSelect"
            className="mr-2"
            checked={!sites.some((props) => props?.isChecked !== true)}
            onChange={handleChange}
          />
          <label className="pt-1">Select All</label>
        </div>
        <br />
        <label>Site ID Query Results</label>
        <br />
        {/* Pagination here */}
        {sites.map((properties, index) => (
          <div key={index} className="flex in-line">
            <CheckboxMain
              className="mr-2 pt-5"
              name={properties.cd}
              value={properties.cd}
              checked={properties?.isChecked || false}
              onChange={handleChange}
            />
            <TeamAssignmentCardView key={properties.key} item={properties} />
          </div>
        ))}
        <div>
          <DataTable
            value={sites}
            paginator
            paginatorTemplate={template2}
          ></DataTable>
        </div>
      </div>
      <div className="col-span-1">
        <InputLabel>Team</InputLabel>
        <Dropdown
          value={selectedTeam}
          options={teamItems}
          onChange={onTeamChange}
          optionLabel="name"
          placeholder="Select Team"
        />
      </div>
      <div>
        <PrimaryButton>Assign Team</PrimaryButton>
      </div>
    </Layout>
  );
}
