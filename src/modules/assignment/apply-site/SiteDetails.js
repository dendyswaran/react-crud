import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { genGetDataById } from "../../../commons/GenericAction";
import SampleModal from "../../../components/Modal/SampleModal";
import FileUploaderPanel from "../../../components/FormComponents/FileUploaderPanel";

const SiteDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [items, setItem] = useState([]);

  useEffect(() => {
    dispatch(
      genGetDataById(`/api/tasklist/get-site/${id}`, (_respData) => {
        setItem(_respData);
      })
    );
  }, []);

  return (
    <Fragment>
      <SampleModal state={items} />
      <div className="rounded-lg container bg-white w-full p-4">
        <strong>Upload Site Approval</strong>
      </div>
      <FileUploaderPanel />
    </Fragment>
  );
};

export default SiteDetails;
