import Layout from "../../components/Layout";
import UserManagementForm from "./Partial/UserManagementForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// const DUMMY_USER_ID = "DEC001";

const UserFormPage = () => {
  const { id } = useParams();
  return (
    <Layout>
      <UserManagementForm userId={id} />
      <br />
    </Layout>
  );
};

export default UserFormPage;
