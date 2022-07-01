import SiteAccessCardView from "../../components/CardView/SiteAccessCardView";
import PrimaryButton from "../../components/Button/PrimaryButton";
import InputTextBar from "../../components/FormComponents/InputTextBar";
import { genGetDataById } from "../../commons/GenericAction";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Fragment } from "react";

export default function SiteAccessPage() {
  const dispatch = useDispatch();
  const [items, setItem] = useState([]);

  //Paginator and Search States
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
  }, []);

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
    </Fragment>
  );
}
