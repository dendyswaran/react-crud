import { Fragment } from "react";

const PrimaryHeader = (props) => {
  return <Fragment>
      <div className="container grid  grid-cols-1 w-max text-left">
          <div className="font-normal capitalize text-red-900 text-2xl">{props.children}</div>
          <div className="font-light capitalize text-black text-2sm">{props.secondary}</div>
      </div>
  </Fragment>;
};

export default PrimaryHeader;
