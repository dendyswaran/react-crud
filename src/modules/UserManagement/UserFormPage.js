// import Layout from "../../components/Layout";
import UserForm from "./Partial/UserForm";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";

// const DUMMY_USER_ID = "DEC001";

const UserFormPage = () => {
  const { id = undefined } = useParams();
  return (
    <Fragment>
      <UserForm userId={id} />
    </Fragment>
  );
};

export default UserFormPage;
