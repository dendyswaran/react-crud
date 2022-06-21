import ListingInfoCardView from "./ListingInfoCardView";
import ClickableHeader from "../Header/ClickableHeader";
import { Link } from "react-router-dom";
import PrimaryHeader from "../Header/PrimaryHeader";

const TasklistCardView = (props, { ...rest }) => {
  let counter = 0;
  return (
    <div className="pb-3">
      <Link
        to={props.href}
        className="rounded-lg inline-flex flex-row bg-white w-full p-4 grid gap-4 grid-cols-12 hover:bg-teal-50"
      >
        <div className="lg:col-start-1 lg:col-span-2 col-span-4">
          <PrimaryHeader primary={props.primary} secondary={props.secondary} />
        </div>
        <div className="lg:col-start-3 lg:col-span-5  inline-flex flex-row flex-wrap text-sm col-start-5 col-span-6">
          {props.data.map((item) => (
            <ListingInfoCardView key={counter++} strInfo={item} />
          ))}
        </div>
        <div className="lg:col-span-1 lg:col-start-12 inline-flex flex-row flex-wrap text-sm col-start-12 my-auto mx-auto">
          <i className="pi pi-chevron-right text-secondary"></i>
        </div>
      </Link>
    </div>
  );
};

export default TasklistCardView;
