import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import MyAccountPage from "./modules/account/MyAccountPage";
import SigninPage from "./modules/authentication/SigninPage";
import SignupPage from "./modules/authentication/SignupPage";
import DashboardPage from "./modules/dashboard/DashboardPage";
import DrinkEditPage from "./modules/drink/DrinkEditPage";
import DrinkPage from "./modules/drink/DrinkPage";
import IohTasklistPageOld from "./modules/tasklist/IohTasklistPageOld";
import UserManagementMain from "./modules/UserManagement/UserManagementMain";
import UserFormPage from "./modules/UserManagement/UserFormPage";
import UserManagementForm from "./modules/UserManagement/Partial/UserManagementForm";
import MenuEditPage from "./modules/menu/MenuEditPage";
import MenuPage from "./modules/menu/MenuPage";
import ManageUserPage from "./modules/manage-user/pages/ManageUserPage";
import { EditUserPageWrapped } from "./modules/manage-user/pages/EditUserPage";
import DecomTaskListDetails from "./modules/tasklist/tasklist_details/DecomTasklistDetails";
import IohTaskListDetailOld from "./modules/tasklist/tasklist_details/IohTasklistDetailsOld";
import DecomTasklistPage from "./modules/tasklist/DecomTasklistPage";
import PageLayout from "./components/PageLayout";
import Layout from "./components/Layout";
import ScrapTasklistPage from "./modules/tasklist/ScrapTasklistPage";
import ScrapTaskListDetails from "./modules/tasklist/tasklist_details/ScrapTasklistDetails";
import OemTasklistPage from "./modules/tasklist/OemTasklistPage";
import OemTasklistDetails from "./modules/tasklist/tasklist_details/OemTasklistDetails";
import IohTasklistPage from "./modules/tasklist/IohTasklistPage";
import IohTasklistDetails from "./modules/tasklist/tasklist_details/IohTasklistDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<RequireAuth><DashboardPage /></RequireAuth>} /> */}
        {/* START */}
        <Route path="/" element={<Layout />}>
          {/*TODO: need to re-evaluate on the design decision such that to insert the text here or DB or useEffect (useEffect is probably the best?)!!!  */}
          {/*TODO: Try to figure out if RequireAuth is required for all tags or only the most outer tags !!! */}
          <Route
            path="user-management"
            element={<PageLayout text="User Management" />}
          >
            <Route
              path=""
              element={
                <RequireAuth>
                  <UserManagementMain />
                </RequireAuth>
              }
            />
            <Route
              path="form"
              element={
                <RequireAuth>
                  <UserManagementForm />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="ioh-tasklist-old"
            element={<PageLayout text="IOH Task List (OLD)" />}
          >
            <Route
              path=""
              element={
                <RequireAuth>
                  <IohTasklistPageOld />
                </RequireAuth>
              }
            />
            <Route
              path="details/:id"
              element={
                <RequireAuth>
                  <IohTaskListDetailOld />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="ioh-tasklist"
            element={<PageLayout text="IOH Task List" />}
          >
            <Route
              path=""
              element={
                <RequireAuth>
                  <IohTasklistPage />
                </RequireAuth>
              }
            />
            <Route
              path="details/:id"
              element={
                <RequireAuth>
                  <IohTasklistDetails />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="decom-tasklist"
            element={<PageLayout text="Decom Task List" />}
          >
            <Route
              path=""
              element={
                <RequireAuth>
                  <DecomTasklistPage />
                </RequireAuth>
              }
            />
            <Route
              path="details/:id"
              element={
                <RequireAuth>
                  <DecomTaskListDetails />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="scrap-tasklist"
            element={<PageLayout text="Scrap Task List" />}
          >
            <Route
              path=""
              element={
                <RequireAuth>
                  <ScrapTasklistPage />
                </RequireAuth>
              }
            />
            <Route
              path="details/:id"
              element={
                <RequireAuth>
                  <ScrapTaskListDetails />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="oem-tasklist"
            element={<PageLayout text="OEM Task List" />}
          >
            <Route
              path=""
              element={
                <RequireAuth>
                  <OemTasklistPage />
                </RequireAuth>
              }
            />
            <Route
              path="details/:id"
              element={
                <RequireAuth>
                  <OemTasklistDetails />
                </RequireAuth>
              }
            />
          </Route>
        </Route>

        {/* END */}
        <Route
          path="/my-account"
          element={
            <RequireAuth>
              <MyAccountPage />
            </RequireAuth>
          }
        />
        <Route
          path="/drink"
          element={
            <RequireAuth>
              <DrinkPage />
            </RequireAuth>
          }
        />
        <Route
          path="/drink/edit/:id"
          element={
            <RequireAuth>
              <DrinkEditPage />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/menu"
          element={
            <RequireAuth>
              <MenuPage />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/menu/:id"
          element={
            <RequireAuth>
              <MenuEditPage />
            </RequireAuth>
          }
        />
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/manage-user/user-list"
          element={
            <RequireAuth>
              <ManageUserPage />
            </RequireAuth>
          }
        />
        <Route
          path="/manage-user/edit/:userId"
          element={
            <RequireAuth>
              <EditUserPageWrapped />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
