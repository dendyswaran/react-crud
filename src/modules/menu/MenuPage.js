import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import Layout from "../../components/Layout";
import MenuForm from "./partial/MenuForm";
import MenuList from "./partial/MenuList";

export default function MenuPage() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <Layout>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="List" leftIcon="pi pi-list">
                    <MenuList />
                </TabPanel>
                <TabPanel header="Add New" leftIcon="pi pi-plus">
                    <MenuForm />
                </TabPanel>
            </TabView>
        </Layout>
    )
}