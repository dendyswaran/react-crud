import { Link } from "react-router-dom";
import { Fragment } from "react";
import useMenuAction from "../../modules/menu/services/MenuState";

const NavLink = ({ text, href }) => {
  const { click_event_map } = useMenuAction();
  const isActive = click_event_map[href] === "OPEN" ? true : false;

  const NavTextFormatter = (oldString) => {
    return oldString.replace(/-/, " ");
  };
  const formattedText = NavTextFormatter(text);

  const activeLink = (
    <Link to={href} className="capitalize text-secondary hover:text-primary">
      {formattedText}
    </Link>
  );

  const inactiveLink = (
    <span className="capitalize text-black">{formattedText}</span>
  );

  const navLink = isActive ? activeLink : inactiveLink;

  return (
    <Fragment>
      <li>
        <i className="pi pi-chevron-right pt-1 mx-2"></i>
      </li>
      <li>{navLink}</li>
    </Fragment>
  );
};

export default NavLink;
