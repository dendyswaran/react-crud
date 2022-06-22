import { Fragment } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import CustomBreadCrumb from "./CustomBreadCrumb";
import { useState, useEffect } from "react";

const NavPath = () => {
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    const pathArr = path.split("/");

    let finalArr = [];

    for (let i = 1; i < pathArr.length; i++) {
      let rPathArr = pathArr.slice(1, i + 1);
      let rPathStr = rPathArr.join("/");
      finalArr.push({ label: pathArr[i], url: "/" + rPathStr });
    }
    setItems(finalArr);
    setIsLoading(false);
  }, [items]);

  const home = {
    icon: "pi pi-home",
    url: "/",
  };

  return (
    // <BreadCrumb model={items} home={home}></BreadCrumb>
    <Fragment>
      {!isLoading && <CustomBreadCrumb model={items} home={home} />}
    </Fragment>
  );
};

export default NavPath;
