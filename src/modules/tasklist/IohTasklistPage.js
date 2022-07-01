import { Fragment } from "react";
import TasklistCardView from "../../components/CardView/TasklistCardView";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTAppSites } from "./services/TasklistAction";
import useTasklistAction from "./services/TasklistState";

const IohTasklistPage = () => {
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
          href={`/ioh-tasklist/details/${properties.id}`}
          primary={properties.cd}
          secondary="SITE ID"
          data={[properties.eqpCount + " Equipments", properties.nm]}
        />
      ))}
    </Fragment>
  );
};

export default IohTasklistPage;
