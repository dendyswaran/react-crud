import {useRef, useState} from "react";
import UserInfoCardView from "./UserInfoCardView";
import IconCardHeader from "../Header/IconCardHeader";
import { InputSwitch } from "primereact/inputswitch";
import PrimaryButton from "../Button/PrimaryButton";

const UserListingCardView = (props) => {
  const [checked, setChecked] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastRef = useRef();

  const handleEditButton = () => {
    navigate("/user-form/" + props.userDetails.userId);
  }


  const handleDeleteUser = () => {
    if(props.userDetails.userId && props.userDetails.userId > 0) {
      dispatch(genDeleteData('api/manage-user',
          props.userDetails.userId,
          (result) => {
            toastRef.current.show({ severity: 'success', summary: 'Success Message', detail: result.message || "Data has been deleted!", life: 3000 });
            navigate("/user-management");
          }
      ));
    }
  }

  const handleBeforeDelete = (e) => {
    setShowDeleteDialog(true);
  }


  const TEXT_NAME = "Name";
  const TEXT_USER_GROUP = "User Group";
  const TEXT_TEAM = "Team";
  const TEXT_ORGANIZATION = "Organization";
  const TEXT_PHONE_NUMBER = "Phone No";
  const TEXT_EMAIL_ADDRESS = "Email";

  return (
    // TODO: Change table structure to grid --> when phone screen is small --> split into 2 rows (until 320px can fit)
    <div className="p-1">
      <div className="rounded-lg container bg-white w-full p-4">
        <div className="container inline-flex flex-row pt-4 pb-8">
          <IconCardHeader icon="pi-user" header={props.userDetails.userId} />

        <ConfirmDialog visible={showDeleteDialog} onHide={()=> setShowDeleteDialog(false)} message="Are you sure you want to delete this user?"
                       header="Confirmation" icon="pi pi-exclamation-triangle" reject={() => { setShowDeleteDialog(false) }} accept={handleDeleteUser}/>
        <div className="p-1">
          <div className="rounded-lg container bg-white w-full p-4">
            <div className="container inline-flex flex-row pt-4 pb-8">
              <IconCardHeader icon="pi-user">
                {props.userDetails.userId}
              </IconCardHeader>

              <div className="ml-auto flex">
                <div>
                  <div className="card pt-1 pr-2">
                    <InputSwitch
                        checked={checked}
                        onChange={(e) => setChecked(e.value)}
                    />
                  </div>
                </div>
                <PrimaryButton icon="pi pi-pencil" onClick={handleEditButton}></PrimaryButton>
                <PrimaryButton icon="pi pi-trash" onClick={handleBeforeDelete}></PrimaryButton>
              </div>
            </div>
            <PrimaryButton icon="pi pi-pencil"></PrimaryButton>
          </div>
        </div>
      </div>
      </div>
      </div>
  );
};

export default UserListingCardView;
