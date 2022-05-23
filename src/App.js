 import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import MyAccountPage from "./modules/account/MyAccountPage";
import SigninPage from "./modules/authentication/SigninPage";
import SignupPage from "./modules/authentication/SignupPage";
import DashboardPage from "./modules/dashboard/DashboardPage";
import DrinkEditPage from "./modules/drink/DrinkEditPage";
import DrinkPage from "./modules/drink/DrinkPage";
import MenuEditPage from "./modules/menu/MenuEditPage";
import MenuPage from "./modules/menu/MenuPage";
import ManageUserPage from "./modules/manage-user/pages/ManageUserPage";
 import EditUserPage from "./modules/manage-user/pages/EditUserPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/my-account" element={<RequireAuth><MyAccountPage /></RequireAuth>} />
        <Route path="/drink" element={<RequireAuth><DrinkPage /></RequireAuth>} />
        <Route path="/drink/edit/:id" element={<RequireAuth><DrinkEditPage /></RequireAuth>} />
        <Route path="/settings/menu" element={<RequireAuth><MenuPage /></RequireAuth>} />
        <Route path="/settings/menu/:id" element={<RequireAuth><MenuEditPage /></RequireAuth>} />
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/manage-user/user-list" element={<RequireAuth><ManageUserPage /></RequireAuth>} />
        <Route path="/manage-user/edit/:userId" element={<RequireAuth><EditUserPage/></RequireAuth>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
