import ListingInfoCardView from "./ListingInfoCardView";
import ClickableHeader from "../Header/ClickableHeader";

const TeamAssignmentCardView = ({ item, href }) => {
  const timestampStr = "Uploaded on " + item.timestamp;
  const uploadedByStr = "By " + item.author;

  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="col-span-1">
          <ClickableHeader
            header="FILE NAME"
            secondary={item.siteId}
          />
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm  col-span-2">
          <ListingInfoCardView strInfo={timestampStr} />
          <ListingInfoCardView strInfo={uploadedByStr} />
        </div>
      </div>
    </div>
  );
};

export default TeamAssignmentCardView;