import ListingInfoCardView from "./ListingInfoCardView";
import PrimaryHeader from "../Header/PrimaryHeader";
import FileUploaderPanel from "../FormComponents/FileUploaderPanel"
import InputLabel from "../../components/FormComponents/InputLabel";

const FileUploadedCardView = ({ item, href }) => {
  const timestampStr = "Uploaded on " + item.timestamp;
  const uploadedByStr = "By " + item.author;

  //COL-SPAN-1 helps with keeping the FILE NAME ande details in line if ine a large view
  //COL-SPAN-2 however will help in file name won't overflow out of the container
  //We can decide later which one to use
  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="col-span-1">
          <InputLabel>FILE NAME</InputLabel>
          <PrimaryHeader
            secondary={item.fileName}
          />
        </div>
        <div className="lg:col-span-1 inline-flex flex-row flex-wrap text-sm  col-span-2">
          <ListingInfoCardView strInfo={timestampStr} />
          <ListingInfoCardView strInfo={uploadedByStr} />
        </div>
      </div>
    </div>
  );
};

export default FileUploadedCardView;