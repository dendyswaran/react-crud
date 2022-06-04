import { Dropdown } from "primereact/dropdown";

const DropdownBar = ({ ...rest }) => {
  return <Dropdown className="standardBar full" {...rest} />;
};

export default DropdownBar;