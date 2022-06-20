import HealthCheckCardView from "../../../../components/CardView/HealthCheckCardView";

const HealthCheck = (props) => {
  return (
    <HealthCheckCardView
      primary={props.primary}
      secondary={props.secondary}
      make={props.make}
      model={props.model}
      serial={props.serial}
      eqpType={props.eqpType}
    />
  );
};

export default HealthCheck;
