import { Fragment } from "react";

const PrimaryHeader = ({ primary, secondary }) => {
  return (
    <Fragment>
      <div className="container grid  grid-cols-1 pl-1 w-max text-left">
        <div className="font-normal capitalize text-red-900 text-2xl">
          {primary}
        </div>
        <div className="font-light capitalize text-black text-2sm">
          {secondary}
        </div>
      </div>
    </Fragment>
  );
};

export default PrimaryHeader;