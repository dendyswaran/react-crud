import ListingInfoCardView from "./ListingInfoCardView";
import ClickableHeader from "../Header/ClickableHeader";

const IohCardView = ({ item, href }) => {
  const equipmentStr = item.equipment + " Equipments";
  const vendorStr = item.vendor;
  const toDecomStr = "To Decom " + item.decom;

  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="col-span-1">
          <ClickableHeader
            header={item.siteId}
            href={href}
            secondary="SITE ID"
          />
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm  col-span-2">
          <ListingInfoCardView strInfo={equipmentStr} />
          <ListingInfoCardView strInfo={vendorStr} />
          <ListingInfoCardView strInfo={toDecomStr} />
        </div>
      </div>
    </div>
  );
};

export default IohCardView;