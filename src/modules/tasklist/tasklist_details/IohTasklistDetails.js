import { Fragment } from "react";
import { fetchAllEqps } from "../services/TasklistAction";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useTasklistAction from "../services/TasklistState";
import SampleModal from "../../../components/Modal/SampleModal";
import IohDetailCardView from "../../../components/CardView/IohDetailsCardView";

const IohTasklistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tasklist, details } = useTasklistAction();

  useEffect(() => {
    dispatch(fetchAllEqps(id));
  }, []);

  return (
    <Fragment>
      <SampleModal state={tasklist} />
      {details.map((eqp) => (
        <IohDetailCardView
          key={eqp.id}
          header={eqp.cd}
          dscp={eqp.dscp}
          make={"N/A"}
          model={eqp.model}
          serial={eqp.serialNo}
          eqpType={eqp.eqpType}
        />
      ))}
    </Fragment>
  );
};

export default IohTasklistDetails;
