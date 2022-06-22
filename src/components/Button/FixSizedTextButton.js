import { Button } from "primereact/button";

const FixSizedTextButton = ({ ...rest }) => {
  return <Button {...rest} className="w-40 btn secondary m-1" />;
};

export default FixSizedTextButton;
