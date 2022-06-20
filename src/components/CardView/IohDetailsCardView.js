import PrimaryHeader from "../Header/PrimaryHeader";
import ListingInfoCardView from "./ListingInfoCardView";
import ScrapReuseCard from "./ScrapReuseCardView";
import { ReuseCard, ScrapCard } from "./ScrapReuseCardView";

const IohDetailCardView = ({ header, dscp, make, model, serial, eqpType }) => {

  // TODO: use a switch instead of this (to support more than 2 types in the future),
  //  also this is used for other card so its better to convert this into a function instead.
  const isReuse = (eqpType == "REUSE") ? true : false; 

  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid lg:grid-cols-6 grid-cols-5 lg:order-1 order-1">
        <div className="lg:col-span-2 col-span-3">
          <PrimaryHeader primary={header} secondary={dscp} />
        </div>
        <div className="lg:col-span-3 inline-flex flex-row flex-wrap text-sm col-span-5 lg:order-2 order-3">
          <ListingInfoCardView strInfo={make} />
          <ListingInfoCardView strInfo={model} />
          <ListingInfoCardView strInfo={serial} />
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm col-span-2 lg:order-3 order-2 ml-auto">
          {!isReuse && <ScrapCard></ScrapCard>}
          {isReuse && <ReuseCard></ReuseCard>}
        </div>
      </div>
    </div>
  );
};

export default IohDetailCardView;
