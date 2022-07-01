import { Fragment } from "react";
import { fetchAllEqps } from "../services/TasklistAction";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useTasklistAction from "../services/TasklistState";
import SampleModal from "../../../components/Modal/SampleModal";
import MatchingCardView from "../../../components/CardView/MatchingCardView";

const ScrapTaskListDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, tasklist, details } = useTasklistAction();

  useEffect(() => {
    dispatch(fetchAllEqps(id));
  }, []);

  return (
    <Fragment>
      <SampleModal state={tasklist} />
      {!isLoading &&
        details.map((eqp) => (
          <MatchingCardView
            key={eqp.id}
            primary={eqp.cd}
            secondary={eqp.dscp}
            make="N/A" // TODO: to be retrieved from backend
            model={eqp.model}
            serial={eqp.serialNo}
            eqpType="REUSE" // TODO: to be retrieved from backend
          />
        ))}
    </Fragment>
  );
};

export default ScrapTaskListDetails;
