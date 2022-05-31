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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/my-account" element={<RequireAuth><MyAccountPage /></RequireAuth>} />
        <Route path="/ioh-tasklist" element={<RequireAuth><IohTasklistPage /></RequireAuth>} />
        <Route path="/user-management" element={<RequireAuth><UserManagementPage/></RequireAuth>} />
        <Route path="/user-form" element={<RequireAuth><UserFormPage/></RequireAuth>} />
        <Route path="/drink" element={<RequireAuth><DrinkPage /></RequireAuth>} />
        <Route path="/drink/edit/:id" element={<RequireAuth><DrinkEditPage /></RequireAuth>} />
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
