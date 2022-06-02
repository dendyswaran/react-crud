import Layout from "../../components/Layout";
import IohCardView from "../../components/CardView/IohCardView";

const items = [
  {
    id: 1,
    siteId: "C008009",
    equipment: 20,
    vendor: "PT Cellsite",
    decom: "6 Jun 2022",
  },
  {
    id: 2,
    siteId: "C008010",
    equipment: 2,
    vendor: "test2",
    decom: "6 Jun 2022",
  },
  {
    id: 3,
    siteId: "C008011",
    equipment: 3,
    vendor: "test3",
    decom: "6 Jun 2022",
  },
];

// TODO: rename IOH tasklist to camel case to match decom tasklist
export default function IohTasklistPage() {
  return (
    <Layout>
        {/* <CardView></CardView> */}
        {/* TODO: key to be added */}
        {items.map((properties) => (<IohCardView key={properties.id} item={properties}/>))}
    </Layout>
  );
}
