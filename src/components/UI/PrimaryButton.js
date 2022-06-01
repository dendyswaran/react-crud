import { Button } from "primereact/button";

const PrimaryButton = (props) => {
  return (
    <div className="p-1">
      <Button icon={props.icon} className="btn primary h-10" onClick={props.onClick}></Button>
    </div>
  );
};

export default PrimaryButton;
