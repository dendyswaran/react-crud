import ListingInfoCardView from "./ListingInfoCardView";
import { Link } from "react-router-dom";
import PrimaryHeader from "../Header/PrimaryHeader";

function formatDate(string){
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString('en-US',options);
}

const FileUploadedCardView = (props, { ...rest }) => {
  let counter = 0;

  return (
    <div className="pb-3 w-full">
    <Link
            to={props.href}
            className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3"
    >
        <div className="lg:col-start-1 lg:col-span-2 col-span-4">
          <PrimaryHeader primary={props.primary} secondary={props.secondary} />
        </div>
        <div className="lg:col-start-3 lg:col-span-5  inline-flex flex-row flex-wrap text-sm col-start-8 col-span-6">
          {props.data.map((item) => (
              <ListingInfoCardView key={counter++} strInfo={item} />
          ))}
        </div>
    </Link>
    </div>
  );
};

export default FileUploadedCardView;