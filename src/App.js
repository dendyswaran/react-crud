 import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import MyAccountPage from "./modules/account/MyAccountPage";
import SigninPage from "./modules/authentication/SigninPage";
import SignupPage from "./modules/authentication/SignupPage";
import DashboardPage from "./modules/dashboard/DashboardPage";
import DrinkEditPage from "./modules/drink/DrinkEditPage";
import DrinkPage from "./modules/drink/DrinkPage";
import IohTasklistPage from "./modules/tasklist/IohTasklistPage";
import UserManagementPage from "./modules/UserManagement/UserManagementPage";
import UserFormPage from "./modules/UserManagement/UserFormPage";
import MenuEditPage from "./modules/menu/MenuEditPage";
import MenuPage from "./modules/menu/MenuPage";
import ManageUserPage from "./modules/manage-user/pages/ManageUserPage";
import {EditUserPageWrapped} from "./modules/manage-user/pages/EditUserPage";
import DecomTaskListDetail from "./modules/tasklist/tasklist_details/DecomTasklistDetail";
import FileUploadPage from "./modules/file-upload/FileUploadPage";
import AssignTeamPage from "./modules/assignment/assign-team/AssignTeamPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/my-account" element={<RequireAuth><MyAccountPage /></RequireAuth>} />
        <Route path="/ioh-tasklist" element={<RequireAuth><IohTasklistPage /></RequireAuth>} />
        <Route path="/decom-tasklist-detail" element={<RequireAuth><DecomTaskListDetail /></RequireAuth>} />
        <Route path="/user-management" element={<RequireAuth><UserManagementPage/></RequireAuth>} />
        <Route path="/user-form" element={<RequireAuth><UserFormPage/></RequireAuth>} />
        <Route path="/drink" element={<RequireAuth><DrinkPage /></RequireAuth>} />
        <Route path="/drink/edit/:id" element={<RequireAuth><DrinkEditPage /></RequireAuth>} />
        <Route path="/settings/menu" element={<RequireAuth><MenuPage /></RequireAuth>} />
        <Route path="/settings/menu/:id" element={<RequireAuth><MenuEditPage /></RequireAuth>} />
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/manage-user/user-list" element={<RequireAuth><ManageUserPage /></RequireAuth>} />
        <Route path="/manage-user/edit/:userId" element={<RequireAuth><EditUserPageWrapped/></RequireAuth>}/>
        <Route path="/file-upload" element={<RequireAuth><FileUploadPage/></RequireAuth>} />
        <Route path="/assign-team" element={<RequireAuth><AssignTeamPage/></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
