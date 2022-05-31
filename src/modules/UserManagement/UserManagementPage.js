import Layout from "../../components/Layout";
import UserListingCardView from "../../components/CardView/UserListingCardView";

const items = [
  {
    id: "1",
    userId: "DEC001",
    name: "Anthony Tan",
    userGroup: "Decom",
    team: 7,
    organization: "A001382-PT CellSite",
    phone: "01260112233",
    email: "DEC001@gmail.com",
  },
  {
    id: "2",
    userId: "ADM001",
    name: "Handy Antalius",
    userGroup: "IOH",
    team: 8,
    organization: "Indosat",
    phone: "01260114455",
    email: "Admin@gmail.com",
  },
  {
    id: "1",
    userId: "SCP001",
    name: "Alexander",
    userGroup: "Scrap",
    team: 9,
    organization: "B001762-PT-Dexter",
    phone: "01260116677",
    email: "SCP001@gmail.com",
  },
  {
    id: "1",
    userId: "SCP001",
    name: "Alexander",
    userGroup: "Scrap",
    team: 1,
    organization: "B001762-PT-Dexter",
    phone: "01260116677",
    email: "SCP001@gmail.com",
  },
  {
    id: "1",
    userId: "SCP001",
    name: "Alexander",
    userGroup: "Scrap",
    team: 2,
    organization: "B001762-PT-Dexter",
    phone: "01260116677",
    email: "SCP001@gmail.com",
  },
  {
    id: "1",
    userId: "SCP001",
    name: "Alexander",
    userGroup: "Scrap",
    team: 3,
    organization: "B001762-PT-Dexter",
    phone: "01260116677",
    email: "SCP001@gmail.com",
  },
];

const UserManagementPage = () => {
  return (
    <Layout>
      {/* <CardView></CardView> */}
      {/* TODO: key to be added */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((userInfo) => (
          <UserListingCardView key={userInfo.id} userDetails={userInfo} />
        ))}
      </div>
    </Layout>
  );
};

export default UserManagementPage;
