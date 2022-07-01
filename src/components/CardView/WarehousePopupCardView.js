import { useState } from "react";
import RadioButtonWithLabel from "../Button/RadioButtonWithLabel";
import PrimaryButton from "../Button/PrimaryButton";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { genGetDataById } from "../../commons/GenericAction";
import InputTextBar from "../FormComponents/InputTextBar";

export default function WarehouseDisplay() {
  const dispatch = useDispatch();
  const [position, setPosition] = useState("center");
  const [displayPopup, setDisplayPopup] = useState(false);
  const [warehouse, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState();

  // Search States
  const [searchPostcode, setSearchPostcode] = useState("");

  const handleData = () => {
    dispatch(
      genGetDataById(
        `/api/warehouse-assignment/list-warehouse`,
        (_respData) => {
          /* on success */
          setWarehouses(_respData.content);
          /* set default checked radio button */
          setSelectedWarehouse(_respData.content[0]);
        }
      )
    );
  }

  useEffect(() => {
    handleData();
  }, []);

  // Search logic based on postcode
  const searchWarehouse = () => {
    dispatch(
      genGetDataById(
        `/api/warehouse-assignment/list-warehouse?postcode=` +
          searchPostcode,
        (_respData) => {
          setWarehouses(_respData.content);
          console.info(`Search have been loaded successfully.`);
        }
      )
    );
  };

  const searchBoxPostcode = (e) => {
    setSearchPostcode(
      //assigning value to event target
      (e.target.name = e.target.value)
    );
  };

  const resetSearch = () => {
    setSearchPostcode("");
    handleData();
  };

  const onClick = () => {
    setDisplayPopup(true);
    if (position) {
      setPosition(position);
    }
  };

  // footer in popup card
  const renderFooter = () => {
    return (
      <div className="flex justify-end">
        <PrimaryButton label="Select" onClick={updateWarehouse} />
      </div>
    );
  };

  // update value selected from radio button to InputTextBar in WarehouseAssignPage
  const updateWarehouse = () => {
    setDisplayPopup(false);
    document.getElementById("warehouse-assign").value = selectedWarehouse.cd;
  };

  return (
    /* TODO: searchbar function (from backend) */
    <div className="pb-3">
      <PrimaryButton
        label="Show"
        icon="pi pi-external-link"
        onClick={() => onClick()}
      />

      {/* Popup warehouse list display here */}
      <Dialog
        header="Select Warehouse"
        visible={displayPopup}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={renderFooter()}
        onHide={() => setDisplayPopup(false)}
      >
        <div className="pb-3">
          <div className="flex in-line">
            <InputTextBar
              className="w-50"
              name="search"
              placeholder="Search here"
              value={searchPostcode}
              onChange={searchBoxPostcode}
            ></InputTextBar>
            <PrimaryButton name="search" onClick={searchWarehouse} >Search</PrimaryButton>
            <PrimaryButton name="reset" onClick={resetSearch} >Reset</PrimaryButton>
          </div>
          <div className="pt-5"></div>
          {warehouse.map((warehouse) => {
            return (
              <div
                key={warehouse.id}
                className="field-radiobutton flex in-line"
              >
                <RadioButtonWithLabel
                  label={warehouse.cd}
                  inputId={warehouse.id}
                  name="warehouse"
                  value={warehouse}
                  onChange={(e) => setSelectedWarehouse(e.value)}
                  checked={selectedWarehouse.id === warehouse.id}
                />
                
              </div>
            );
          })}
        </div>
      </Dialog>
    </div>
  );
}
