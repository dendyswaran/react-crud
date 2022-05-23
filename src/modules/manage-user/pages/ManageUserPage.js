import Layout from "../../../components/Layout";
import {useState} from "react";
import {TabPanel, TabView} from "primereact/tabview";
import ManageUserList from "./ManageUserList";
import SignupPage from "../../authentication/SignupPage";

const ManageUserPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Layout>
            <TabView activeIndex={activeIndex} onTabChange={(e)=>setActiveIndex(e.index)}>
                <TabPanel header="User List" leftIcon="pi pi-list">
                    <ManageUserList/>
                </TabPanel>
                <TabPanel header="Register New User" leftIcon="pi pi-plus">
                    <SignupPage />
                </TabPanel>
            </TabView>
        </Layout>
    );
}

export default ManageUserPage;