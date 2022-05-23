import Layout from "../../../components/Layout";
import {useState} from "react";
import {TabPanel, TabView} from "primereact/tabview";
import ManageUserTable from "./ManageUserTable";
import SignupPage from "../../authentication/SignupPage";
import SignupManageUser from "./ManageUserRegister";

const ManageUserPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Layout>
            <TabView activeIndex={activeIndex} onTabChange={(e)=>setActiveIndex(e.index)}>
                <TabPanel header="User List" leftIcon="pi pi-list">
                    <ManageUserTable/>
                </TabPanel>
                <TabPanel header="Register New User" leftIcon="pi pi-plus">
                    <SignupManageUser />
                </TabPanel>
            </TabView>
        </Layout>
    );
}

export default ManageUserPage;