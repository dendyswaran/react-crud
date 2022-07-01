import PrimaryButton from "../Button/PrimaryButton";
import FileUploadPanel from "../FormComponents/FileUploader";

const SiteDetailsCardView = (props) => {
  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="flex">
          <strong>Upload Site Approval</strong>
        </div>
        
      </div>
      <FileUploadPanel />
    </div>
  );
};

export default SiteDetailsCardView;
