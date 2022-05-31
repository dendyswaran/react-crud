import Layout from "../../components/Layout";
import UserManagementForm from "./Partial/UserManagementForm";

const DUMMY_USER_ID = "DEC001";

const UserFormPage = () => {
  return (
    <Layout>
      <UserManagementForm userId={DUMMY_USER_ID} />
      <br />
    </Layout>
  );
};

export default UserFormPage;
