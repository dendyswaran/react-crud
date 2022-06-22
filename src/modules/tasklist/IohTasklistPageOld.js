import { Fragment } from "react";
import IohCardView from "../../components/CardView/IohCardView";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { genGetAllData } from "../../commons/GenericAction";

// TODO: rename IOH tasklist to camel case to match decom tasklist
export default function IohTasklistPageOld() {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(
      genGetAllData(`/api/ioh-tasklist/get-message-response`, (_respData) => {
        /** on success */
        setInitialValues(_respData);
        setIsLoading(false);
      })
    );
  }, []);

  return (
    <Fragment>
      {/* <CardView></CardView> */}
      {/* TODO: key to be added */}

      {!isLoading &&
        initialValues.map((properties) => (
          <IohCardView
          key={properties.id}
            id= {properties.id}
            siteId={properties.cd}
            vendor={properties.nm}
            eqpCount={properties.eqpCount}
          />
        ))}
    </Fragment>
  );
}
