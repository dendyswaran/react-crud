import ListingInfoCardView from "./ListingInfoCardView";
import ClickableHeader from "../Header/ClickableHeader";

const SiteAccessCardView = ({ id, siteId, vendor, eqpCount }) => {
  const siteIdStr = siteId;
  const equipmentStr = eqpCount + " Equipments";
  const vendorStr = vendor;

  const data = {
    siteId: siteId,
    vendor: vendor,
    eqpCount: eqpCount,
  };

  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="flex">
          <div className="col-span-1">
            <ClickableHeader
              header={siteIdStr}
              href={`/site-access/details/${id}`}   // go to SiteDetails.js
              data={data}
              secondary="SITE ID"
            />
          </div>
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm col-span-2">
          <ListingInfoCardView strInfo={equipmentStr} />
          <ListingInfoCardView strInfo={vendorStr} />
        </div>
      </div>
    </div>
  );
};

export default SiteAccessCardView;
