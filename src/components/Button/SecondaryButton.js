import { Button } from "primereact/button";

const SecondaryButton = ({ ...rest }) => {
  return (
    <Button
      {...rest}
      label="Sign In"
      icon="pi pi-sign-in"
      className="w-full btn secondary"
    />
  );
};

export default SecondaryButton;