import ListingInfoCardView from "./ListingInfoCardView";
import PrimaryHeader from "../Header/PrimaryHeader";
import RadioButtonMain from "../Button/RadioButtonMain";
import { useState } from "react";

const MatchingCardView = (props) => {
  // console.log(props.item.siteId);

  const [userGroup, setUserGroup] = useState(null);

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
        <div className="lg:col-span-2 inline-flex flex-row flex-wrap text-sm sm:mx-auto ml-auto col-span-2 lg:order-3 order-4">
          <div class="md:inline-flex mx-auto md:pr-10">
            <div className="inline-flex field-radiobutton">
              <RadioButtonMain
                inputId="ioh_group"
                name="group"
                value="ioh"
                onChange={(e) => setUserGroup(e.value)}
                checked={userGroup === "ioh"}
              />
              <label className="pt-1 pl-2" htmlFor="ioh_group">
                Matching
              </label>
            </div>
          </div>
          <div class="inline-flex mx-auto">
            <div className="inline-flex field-radiobutton">
              <RadioButtonMain
                inputId="decom_group"
                name="group"
                value="decom"
                onChange={(e) => setUserGroup(e.value)}
                checked={userGroup === "decom"}
              />
              <label className="pt-1 pl-2" htmlFor="decom_group">
                Missing
              </label>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm col-span-2 lg:order-4 order-2 ml-auto">
          {/* TODO: make this conditional, when scrap use scrap card when reuse use reuse card */}
          {/* <ScrapCard></ScrapCard> */}
          {/* <ReuseCard></ReuseCard> */}
        </div>
      </div>
    </div>
  );
};

export default MatchingCardView;
