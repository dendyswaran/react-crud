import ListingInfoCardView from "./ListingInfoCardView";
import ClickableHeader from "../Header/ClickableHeader";

function formatDate(string){
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString('en-US',options);
}

const TeamAssignmentCardView = ({ item, href }) => {
  const toDecomStr = "To Decom " + formatDate(item.dtDecom);
  const vendorStr = item.nm;
  const equipmentStr = item.eqpCount + " Equipments";

  return (
    <div className="pb-3 w-full">
      <div className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="col-span-1">
          <ClickableHeader header="SITE ID" secondary={item.cd} />
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
export default TeamAssignmentCardView;
