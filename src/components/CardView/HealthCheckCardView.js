import ListingInfoCardView from "./ListingInfoCardView";
import { ReuseCard, ScrapCard } from "./ScrapReuseCardView";
import PrimaryHeader from "../Header/PrimaryHeader";
import DropdownBarShort from "../FormComponents/DropdownBarShort";

const HealthCheckCardView = (props) => {
  const isReuse = props.eqpType == "REUSE" ? true : false;

  // TODO: Change primary, secondary, make, model etc. into placeholder for props.
  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid lg:grid-cols-6 grid-cols-5 lg:order-1 order-1">
        <div className="lg:col-span-1 col-span-3">
          <PrimaryHeader primary={props.primary} secondary={props.secondary} />
        </div>
        <div className="lg:col-span-2 inline-flex flex-row flex-wrap text-sm col-span-3 lg:order-2 order-3">
          <ListingInfoCardView strInfo={props.make} />
          <ListingInfoCardView strInfo={props.model} />
          <ListingInfoCardView strInfo={props.serial} />
        </div>
        <div className="lg:col-span-2 inline-flex flex-row flex-wrap text-sm lg:mx-auto ml-auto col-span-2 lg:order-3 order-4">
          <DropdownBarShort /> 
          {/* TODO: pull the data selection of Dropdown from the Backend!!! follow the principle of "Single point of truth."*/}
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm col-span-2 lg:order-4 order-2 ml-auto">
          {isReuse && <ReuseCard />}
          {!isReuse && <ScrapCard />}
        </div>
      </div>
    </div>
  );
};

export default HealthCheckCardView;
