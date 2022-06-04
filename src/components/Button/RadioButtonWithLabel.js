import RadioButtonMain from "./RadioButtonMain";
import { Fragment } from "react";

const RadioButtonWithLabel = ({ label, ...rest }) => {
  return (
    <Fragment>
      <RadioButtonMain {...rest} />
      <label className="pt-1 pl-2" htmlFor="decom_group">
        {label}
      </label>
    </Fragment>
  );
};

export default RadioButtonWithLabel;
