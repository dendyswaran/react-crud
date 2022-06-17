import ListingInfoCardView from "./ListingInfoCardView";
import PrimaryHeader from "../Header/PrimaryHeader";
import InputLabel from "../../components/FormComponents/InputLabel";
import { useState } from "react";

const TeamAssignmentCardView = ({ item, href }) => {
  const assignedDateStr = "To Decom " + item.assignedDate;
  const siteNameByStr = "By " + item.siteName;
  const equipmentByStr = item.equipment + " Equipments";

  const [formData, setFormData] = useState({
    team: "",
    selection: false,
  });

  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="col-span-1">
          <div className="flex align-items-center">
            <InputLabel className="pt-1">SITE ID</InputLabel>
          </div>
          <PrimaryHeader htmlFor="siteselection" secondary={item.siteId} />
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm  col-span-2">
          <ListingInfoCardView strInfo={equipmentByStr} />
          <ListingInfoCardView strInfo={siteNameByStr} />
          <ListingInfoCardView strInfo={assignedDateStr} />
        </div>
      </div>
    </div>
  );
};

export default TeamAssignmentCardView;
/*
            <CheckboxMain
              id="siteselection"
              binary
              className="pb-3"
              checked={formData.selection}
              onChange={(e) =>
                setFormData((_c) => ({
                  ..._c,
                  selection: e.target.checked,
                }))
              }
            />
*/