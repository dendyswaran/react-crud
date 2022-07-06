import PrimaryButton from "../../../components/Button/PrimaryButton";
import InputTextBar from "../../../components/FormComponents/InputTextBar";
import WarehousePopupCardView from "../../../components/CardView/WarehousePopupCardView";
import { Fragment } from "react";
import WarehouseAssignDetails from "./WarehouseAssignDetails";

export default function WarehouseAssignPage() {
  return (
    <Fragment>
      <div className="pb-3">
        <WarehouseAssignDetails />

        <div className="grid grid-cols-3 gap-4 pt-8">
          <InputTextBar
            placeholder="Select Warehouse"
            id="warehouse-assign"
            type="text"
            value=""
          />

          <WarehousePopupCardView />

          {/* TODO: Assign function here or in WarehouseAssignDetails? */}
          <div className="flex justify-end">
            <PrimaryButton label="Assign" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
