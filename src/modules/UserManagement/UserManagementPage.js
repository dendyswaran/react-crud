import Layout from "../../components/Layout";
import UserListingCardView from "../../components/CardView/UserListingCardView";
import { fetchUserDatatable, getUserList } from "./services/ManageUserAction";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
    id: "3",
    userId: "SCP001",
    name: "Alexander",
    userGroup: "Scrap",
    team: 9,
    organization: "B001762-PT-Dexter",
    phone: "01260116677",
    email: "SCP001@gmail.com",
  },
  {
    id: "4",
    userId: "SCP001",
    name: "Alexander",
    userGroup: "Scrap",
    team: 1,
    organization: "B001762-PT-Dexter",
    phone: "01260116677",
    email: "SCP001@gmail.com",
  },
  {
    id: "5",
    userId: "SCP001",
    name: "Alexander",
    userGroup: "Scrap",
    team: 2,
    organization: "B001762-PT-Dexter",
    phone: "01260116677",
    email: "SCP001@gmail.com",
  },
  {
    id: "6",
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

  // fetch data from database
  // send to the user management page
  const [userList, setUserList] = useState();
  const [userListState, setUserListState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetUserList();
  }, [userListState]);

  const handleGetUserList = () => {
    dispatch(getUserList(
      (data) => {
        setUserListState(true);
        // console.log(data);
        setUserList(data.map((user) => {
          return {
            id: user.id,
            userId: (user.id && user.id != null) ? user.id : "",
            name: user.name,
            userGroup: (user.orgUsrUsrGroups && user.orgUsrUsrGroups.length > 0) ? user.orgUsrUsrGroups[0].orgUsrGroup.name : "",
            team: (user.orgUsrTeams && user.orgUsrTeams.length > 0) ? user.orgUsrTeams[0].orgTeam.name : "",
            organization: (user.org && user.org.name) ? user.org.name : "",
            phone: "",
            email: user.email,
            mtStatus: (user.mtStatus && user.mtStatus.code) ? user.mtStatus.code === "01" : false
          };
        }));
      },
      (error) => {
        console.log(error.message);
      }));
  }

  return (
    <Layout>
      {/* TODO: key to be added */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {userList && userList.map((userInfo) => (
          <UserListingCardView key={userInfo.id} userDetails={userInfo} />
        ))}
      </div>
    </Layout>
  );
};

export default UserManagementPage;
