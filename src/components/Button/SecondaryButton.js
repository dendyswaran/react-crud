import { Button } from "primereact/button";

const SecondaryButton = ({ ...rest }) => {
  return (
    <Button
      {...rest}
      className="w-full btn secondary m-1"
    />
  );
};

export default SecondaryButton;