import { Fragment } from "react";
import TasklistCardView from "../../components/CardView/TasklistCardView";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useTasklistAction from "./services/TasklistState";
import { fetchAllTAppSites } from "./services/TasklistAction";

const DecomTasklistPage = () => {
  const dispatch = useDispatch();
  const { tasklists } = useTasklistAction();

  useEffect(() => {
    dispatch(fetchAllTAppSites());
  }, []);

  return (
    <Fragment>
      {tasklists.map((properties) => (
        <TasklistCardView
          key={properties.id}
          href={`/decom-tasklist/details/${properties.id}`}
          primary={properties.cd}
          secondary="SITE ID"
          data={[properties.dtDecom, properties.eqpCount + " Equipments"]}
        />
      ))}
    </Fragment>
  );
};

export default DecomTasklistPage;
