import { Fragment } from "react";
import CustomBreadCrumb from "./CustomBreadCrumb";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useMenuAction from "../../modules/menu/services/MenuState";

const NavPath = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const path = window.location.pathname; // TODO: change this to react path
    const pathArr = path.split("/");

    let finalArr = [];

    console.log(path, useMenuAction);

    for (let i = 1; i < pathArr.length; i++) {
      let rPathArr = pathArr.slice(1, i + 1);
      let rPathStr = rPathArr.join("/");
      finalArr.push({ label: pathArr[i], url: "/" + rPathStr });
    }
    setItems(finalArr);
    setIsLoading(false);
  }, [location]);

  const home = {
    icon: "pi pi-home",
    url: "/",
  };

  return (
    <Fragment>
      {!isLoading && <CustomBreadCrumb model={items} home={home} />}
    </Fragment>
  );
};

export default NavPath;
