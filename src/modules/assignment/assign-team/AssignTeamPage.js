import Layout from "../../../components/Layout";
import { useState } from "react";
import TeamAssignmentCardView from "../../../components/CardView/TeamAssignmentCardView"

export default function AssignTeamPage() {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      {
        id: 1,
        siteId: "C008009",
        equipment: 20,
        timestamp: "10-May-22 4:32pm",
        author: "TEAM ASSIGN",
      },
      {
        id: 2,
        siteId: "C008010",
        equipment: 2,
        timestamp: "10-May-22 3:30pm",
        author: "Alex Susanto",
      },
      {
        id: 3,
        siteId: "C008011",
        equipment: 3,
        timestamp: "10-May-22 2:55pm",
        author: "Handry Antalius",
      },
    ];

    return (
        //template on card view. MUST BE RECURRING
        <Layout>
            {items.map((properties) => (<TeamAssignmentCardView key={properties.id} item={properties}/>))}
        </Layout>
    )
}