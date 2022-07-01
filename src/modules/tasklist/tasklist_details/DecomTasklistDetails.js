import HealthCheck from "./tabs/HealthCheck";
import { Fragment } from "react";
import { fetchAllEqps } from "../services/TasklistAction";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useTasklistAction from "../services/TasklistState";
import SampleModal from "../../../components/Modal/SampleModal";
import { TabView, TabPanel } from "primereact/tabview";
import MatchingCardView from "../../../components/CardView/MatchingCardView";

const DecomTaskListDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, tasklist, details } = useTasklistAction();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchAllEqps(id));
  }, []);

  let healthcheck;
  if (!isLoading) {
    //TODO: PUT DUMMY CONDITION AS PLACE HOLDER --> TO BE UPDATED.
    healthcheck = details.filter((eqp) => eqp.hlthChckFlg);
  }
  console.log("is loading: ", isLoading);
  console.log("details: ", details);

  // TODO: filter out those with health flag and populate to health and do the same for
  return (
    <Fragment>
      <SampleModal state={tasklist} />
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        className="bg-gray-200"
      >
        <TabPanel header="Health Check">
          {!isLoading &&
            healthcheck.map((eqp) => (
              <HealthCheck // TODO: change to use HealthCheckCardView Directly and remove HealthCheck class as it is unnecessary.!!!
                key={eqp.id}
                primary={eqp.cd}
                secondary={eqp.dscp}
                make={"N/A"} // TODO: get proper make from backend instead of hardcoding like this!!!
                model={eqp.model}
                serial={eqp.serialNo}
                eqpType={eqp.eqpType}
              />
            ))}
        </TabPanel>
        <TabPanel header="Matching">
          {!isLoading &&
            details.map((eqp) => (
              <MatchingCardView
                key={eqp.id}
                primary={eqp.cd}
                secondary={eqp.dscp}
                make={"N/A"}
                model={eqp.model}
                serial={eqp.serialNo}
                eqpType={eqp.eqpType}
              />
            ))}
        </TabPanel>
      </TabView>

      {/* <Matching /> */}
    </Fragment>
  );
};

export default DecomTaskListDetails;
