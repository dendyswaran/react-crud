import ListingInfoCardView from "./ListingInfoCardView";
import PrimaryHeader from "../Header/PrimaryHeader";

const formatDate = (string) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString('en-GB',options);
}

const WarehouseCardView = ({ item }) => {
  const equipmentStr = item.eqpCount + " Equipments";
  const vendorStr = item.nm;
  const toDecomStr = "To Decom " + formatDate(item.dtDecom);

  return (
    <div className="pb-3 w-full">
      <div className="rounded-lg container bg-white p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="col-span-1">
          <PrimaryHeader primary={item.cd} secondary="SITE ID" />
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm col-span-2">
          <ListingInfoCardView strInfo={equipmentStr} />
          <ListingInfoCardView strInfo={vendorStr} />
          <ListingInfoCardView strInfo={toDecomStr} />
        </div>
      </div>
    </div>
  );
};

export default WarehouseCardView;
