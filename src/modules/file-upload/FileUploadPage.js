import Layout from "../../components/Layout";
import { useState } from "react";
import FileUploadedCardView from "../../components/CardView/FileUploadedCardView"
import FileUploaderPanel from "../../components/FormComponents/FileUploaderPanel"

export default function FileUploadPage() {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      {
        id: 1,
        fileName: "ScrapList_North3",
        timestamp: "10-May-22 4:32pm",
        author: "Irwan Sarif",
      },
      {
        id: 2,
        fileName: "ScrapList_North4",
        timestamp: "10-May-22 3:30pm",
        author: "Alex Susanto",
      },
      {
        id: 3,
        fileName: "ScrapList_North5",
        timestamp: "10-May-22 2:55pm",
        author: "Handry Antalius",
      },
    ];

    return (
        //template on card view. MUST BE RECURRING
        <Layout>
            <FileUploaderPanel></FileUploaderPanel>
            {items.map((properties) => (<FileUploadedCardView key={properties.id} item={properties}/>))}
        </Layout>
    )
}