// import Layout from "./Layout";
import { Fragment } from "react";
import PageHeader from "./Header/PageHeader";
import { Outlet } from "react-router-dom";


const PageLayout = (props) => {
  //TODO: we shouldn't call layout everywhere but instead nest everything in layout at react-dom
  return (
    <Fragment>
      <PageHeader text={props.text}></PageHeader>
      <Outlet />
    </Fragment>
  );
};

export default PageLayout;
