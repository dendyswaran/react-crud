import Layout from "../../components/Layout";
import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from "react";
import FileUploadTable from "./partial/FileUploadTable";
import FileUploadForm from "./partial/FileUploadForm";

export default function FileUploadPage() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <Layout>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="List" leftIcon="pi pi-list">
                    <FileUploadTable />
                </TabPanel>
                <TabPanel header="Add New" leftIcon="pi pi-plus">
                    <FileUploadForm />
                </TabPanel>
            </TabView>
        </Layout>
    )
}