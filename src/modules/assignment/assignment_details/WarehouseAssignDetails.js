import WarehouseCardView from "../../../components/CardView/WarehouseCardView";
import CheckboxMain from "../../../components/FormComponents/CheckboxMain";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { genGetDataById } from "../../../commons/GenericAction";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import InputTextBar from "../../../components/FormComponents/InputTextBar";

// to include checkboxes, pagination, and searching in WarehouseCardView
export default function WarehouseAssignDetails() {
  const dispatch = useDispatch();
  const [items, setItem] = useState([]);

  //Paginator and Search States
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
  }, []);

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

  const searchBoxSites = (e) => {
    setSearchSites(
      //assigning value to event target
      (e.target.name = e.target.value)
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
        <div className="flex flex-inline">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex justify-end">
            <PrimaryButton
              disabled={currentPage === 1 ? true : false}
              onClick={showPrevPage}
            >
              Previous
            </PrimaryButton>
            <PrimaryButton
              disabled={currentPage === totalPages ? true : false}
              onClick={showNextPage}
            >
              Next
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
