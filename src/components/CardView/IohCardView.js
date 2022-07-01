import ListingInfoCardView from "./ListingInfoCardView";
import ClickableHeader from "../Header/ClickableHeader";

const IohCardView = ({ id, siteId, vendor, eqpCount }) => {
  const siteIdStr = siteId;
  const vendorStr = vendor;
  const equipmentStr = eqpCount + " Equipments";

  const data = {
    siteId: siteId,
    vendor: vendor,
    eqpCount: eqpCount,
  };

  // TODO: make this class more general --> href takes in link directly instead of id --> also parameter call something like property1, 2 ,3 is more general!!!
  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="col-span-1">
          <ClickableHeader
            header={siteIdStr}
            href={`/ioh-tasklist-old/details/${id}`}
            data={data}
            secondary="SITE ID"
          />
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm  col-span-2">
          <ListingInfoCardView strInfo={equipmentStr} />
          <ListingInfoCardView strInfo={vendorStr} />
        </div>
      </div>
    </div>
  );
};

export default IohCardView;
