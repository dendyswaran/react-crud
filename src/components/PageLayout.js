// import Layout from "./Layout";
import { Fragment } from "react";
import PageHeader from "./Header/PageHeader";
import { Outlet } from "react-router-dom";
import NavPath from "./NavigationPath/NavPath";
import CustomBreadCrumb from "./NavigationPath/CustomBreadCrumb";

const PageLayout = (props) => {
  //TODO: we shouldn't call layout everywhere but instead nest everything in layout at react-dom
  //TODO:  replace NavPath with BreedCrumb instead

  return (
    <Fragment>
      <NavPath />
      <br />
      <PageHeader text={props.text}></PageHeader>
      <Outlet />
    </Fragment>
  );
};

export default PageLayout;
