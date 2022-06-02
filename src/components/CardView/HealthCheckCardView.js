import ListingInfoCardView from "./ListingInfoCardView";
import ScrapReuseCard from "./ScrapReuseCardView";
import PrimaryHeader from "../Header/PrimaryHeader";
import DropdownBarShort from "../FormComponents/DropdownBarShort";

const HealthCheckCardView = (props) => {
  // TODO: Change primary, secondary, make, model etc. into placeholder for props.
  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid lg:grid-cols-6 grid-cols-5 lg:order-1 order-1">
        <div className="lg:col-span-1 col-span-3">
          <PrimaryHeader primary="RRU" secondary="Remote Radio Unit" />
        </div>
        <div className="lg:col-span-2 inline-flex flex-row flex-wrap text-sm col-span-3 lg:order-2 order-3">
          <ListingInfoCardView strInfo="Huawei" />
          <ListingInfoCardView strInfo="RRU3801C" />
          <ListingInfoCardView strInfo="RRUC09638" />
        </div>
        <div className="lg:col-span-2 inline-flex flex-row flex-wrap text-sm lg:mx-auto ml-auto col-span-2 lg:order-3 order-4">
          <DropdownBarShort />
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm col-span-2 lg:order-4 order-2 ml-auto">
          <ScrapReuseCard reuse={true} />
        </div>
      </div>
    </div>
  );
};

export default HealthCheckCardView;
