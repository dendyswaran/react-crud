import ListingInfoCardView from "./ListingInfoCardView";
import PrimaryHeader from "../Header/PrimaryHeader";
import RadioButtonMain from "../Button/RadioButtonMain";
import { useState } from "react";
import { ScrapCard } from "./ScrapReuseCardView";
import { ReuseCard } from "./ScrapReuseCardView";


const MatchingCardView = (props) => {
  // console.log(props.item.siteId);

  const [group, setGroup] = useState(null);
  const isReuse = props.eqpType == "REUSE" ? true : false;

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
        <div className="lg:col-span-2 inline-flex flex-row flex-wrap text-sm sm:mx-auto ml-auto col-span-2 lg:order-3 order-4">
          <div className="md:inline-flex mx-auto md:pr-10">
            <div className="inline-flex field-radiobutton">
              <RadioButtonMain
                inputId="matching_group"
                name="group"
                value="matching"
                onChange={(e) => setGroup(e.value)}
                checked={group === "matching"}
              />
              <label className="pt-1 pl-2" htmlFor="matching_group">
                Matching
              </label>
            </div>
          </div>
          <div className="inline-flex mx-auto">
            <div className="inline-flex field-radiobutton">
              <RadioButtonMain
                inputId="missing_group"
                name="group"
                value="missing"
                onChange={(e) => setGroup(e.value)}
                checked={group === "missing"}
              />
              <label className="pt-1 pl-2" htmlFor="missing_group">
                Missing
              </label>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm col-span-2 lg:order-4 order-2 ml-auto">
          {/* TODO: make this conditional, when scrap use scrap card when reuse use reuse card */}
          {!isReuse && <ScrapCard></ScrapCard>}
          {isReuse && <ReuseCard></ReuseCard>}
        </div>
      </div>
    </div>
  );
};

export default MatchingCardView;
