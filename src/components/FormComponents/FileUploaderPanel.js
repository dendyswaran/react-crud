import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import InputLabel from "../../components/FormComponents/InputLabel";

const FileUploadPanel = ({strInfo}) => {
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);

    //CSS for the buttons can be decided once approved of the layout
    const chooseOptions = {label: 'Choose', icon: 'pi pi-fw pi-plus'};
    const uploadOptions = {label: 'Upload', icon: 'pi pi-upload', className: 'p-button-success'};
    const cancelOptions = {label: 'Cancel', icon: 'pi pi-times', className: 'p-button-danger'};


    const onUpload = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

  return (
    <div className="pb-3">
      <div className="rounded-lg container bg-white w-full p-4 grid gap-4 lg:grid-cols-2 grid-cols-3">
        <div className="col-span-3">
            <InputLabel>File Upload</InputLabel>
            <FileUpload name="demo[]" url="/" multiple accept="/*" maxFileSize={1000000} onUpload={onUpload}
            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
            chooseLabel="Choose File"/>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPanel;