import { Button } from "primereact/button";

const PrimaryButton = ({ ...rest }) => {
  return (
    <div className="p-1">
      <Button {...rest} className="btn primary"></Button>
    </div>
  );
};

export default PrimaryButton;
