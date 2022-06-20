import IohDetailCardView from "../../../components/CardView/IohDetailsCardView";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { genGetAllData } from "../../../commons/GenericAction";
import { useLocation } from "react-router-dom";
import SampleModal from "../../../components/Modal/SampleModal";

const IohTaskListDetailOld = () => {
  // TODO send request here to backend to get details information
  const { id } = useParams();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // need a way to get tasklist data from here:
  // use redux? or pass with props?
  const location = useLocation();
  // const {state} = location.state;

  const tasklistData = location.state;

  console.log("location.state: " + location.state);
  console.log("state only: " + tasklistData);

  console.log(tasklistData.siteId);
  console.log(tasklistData.vendor);
  console.log(tasklistData.eqpCount);

  useEffect(() => {
    dispatch(
      genGetAllData(`/api/ioh-tasklist/get-tasklist/${id}`, (_respData) => {
        /** on success */
        setInitialValues(_respData);
        setIsLoading(false);
      })
    );
  }, [id]);

  console.log(initialValues);

  return (
    <Fragment>
      <SampleModal state={tasklistData} />
      {!isLoading &&
        initialValues.map((properties) => (
          <IohDetailCardView
            key={properties.id}
            header={properties.cd}
            dscp={properties.dscp}
            make={properties.tmtMakeDTO.dscp}
            model={properties.model}
            serial={properties.serialNo}
            eqpType={properties.eqpType}
          />
        ))}
    </Fragment>
  );
};

export default IohTaskListDetailOld;
