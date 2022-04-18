import Layout from "../../components/Layout";
import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from "react";
import DrinkTable from "./partial/DrinkTable";
import DrinkForm from "./partial/DrinkForm";

export default function DrinkPage() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <Layout>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="List" leftIcon="pi pi-list">
                    <DrinkTable />
                </TabPanel>
                <TabPanel header="Add New" leftIcon="pi pi-plus">
                    <DrinkForm />
                </TabPanel>
            </TabView>
        </Layout>
    )
}