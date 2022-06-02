import HealthCheck from "./tabs/HealthCheck";
import Matching from "./tabs/Matching";
import Layout from "../../../components/Layout";

const DecomTaskListDetail = () => {
  return (
    <Layout>
      <HealthCheck/>
      <Matching/>
    </Layout>
  );
};

export default DecomTaskListDetail;