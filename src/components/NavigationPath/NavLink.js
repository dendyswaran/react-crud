import { Link } from "react-router-dom";
import { Fragment } from "react";

const NavLink = (props) => {
  const NavTextFormatter = (oldString) => {
    return oldString.replace(/-/, " ");
  };

  const formattedText = NavTextFormatter(props.text);

  return (
    <Fragment>
      <li>
        <i className="pi pi-chevron-right pt-1 mx-2"></i>
      </li>
      <li>
        <Link
          to={props.href}
          className="capitalize text-secondary hover:text-primary"
        >
          {formattedText}
        </Link>
      </li>
    </Fragment>
  );
};

export default NavLink;
