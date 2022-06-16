import Layout from "../../components/Layout";
import UserForm from "./Partial/UserForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// const DUMMY_USER_ID = "DEC001";

const UserFormPage = () => {
  const { id=undefined } = useParams();
  return (
    <Layout>
      <UserForm userId={id} />
      <br />
    </Layout>
  );
};

export default UserFormPage;
