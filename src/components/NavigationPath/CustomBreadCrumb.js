import NavLink from "./NavLink";
import { Link } from "react-router-dom";

const CustomBreadCrumb = ({ model, home }) => {
  return (
    <nav>
      <ol className="list-reset flex">
        <li>
          <Link to={home.url}>
            <i className={home.icon + " text-secondary hover:text-primary"}></i>
          </Link>
        </li>
        {model.map((item) => (
          <NavLink key={item.url} href={item.url} text={item.label} />
        ))}
      </ol>
    </nav>
  );
};

export default CustomBreadCrumb;
