import React, {useRef, useState} from "react";
import UserInfoCardView from "./UserInfoCardView";
import IconCardHeader from "../Header/IconCardHeader";
import { InputSwitch } from "primereact/inputswitch";
import PrimaryButton from "../Button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { genDeleteData } from "../../commons/GenericAction";
import { useDispatch } from "react-redux";
import {activateUser, deactivateUser} from "../../modules/UserManagement/services/ManageUserAction";

const UserListingCardView = (props) => {
  const [checked, setChecked] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastRef = useRef();

  const handleEditButton = (e) => {
    // console.log(e.currentTarget.id);
    navigate("/user-form/" + e.currentTarget.id);
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

  const handleActivateUser = (id) => {
    console.log(id);
    if(id && id.length > 0) {
      if(props.userDetails.mtStatus) {
        dispatch(deactivateUser(id, () => {
          console.log("reload");
          // navigate("/user-management");
          window.location.reload();
        }, (error) => {
          console.log(error);
        }));
      }else {
        dispatch(activateUser(id, () => {
          console.log("reload");
          window.location.reload();
        }, (error) => {
          console.log(error);
        }));
      }
    }
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
          {/* <IconCardHeader icon="pi-user" header={props.userDetails.id} /> */}
          <IconCardHeader icon="pi-user" header={props.userDetails.id.substring(0,18)+"..."} />
          {/* <IconCardHeader icon="pi-user" header={md5(props.userDetails.id).toString().substring(0,18)+"..."} /> */}

          <div className="ml-auto flex">
            <div>
              <div className="card pt-1 pr-2">
                <InputSwitch
                  checked={checked}
                  onChange={(e) => setChecked(e.value)}
                />
              </div>
            </div>
            <PrimaryButton icon="pi pi-pencil" onClick={handleEditButton} id={props.userDetails.id}></PrimaryButton>
          </div>
        </div>

        <table className="w-full table-auto text-slate-500 text-sm">
          <tbody>
            <tr>
              <td className="w-1/3">{TEXT_NAME}</td>
              <td className="flex">
                <UserInfoCardView>{props.userDetails.name}</UserInfoCardView>
              </td>
            </tr>
            <tr>
              <td className="w-1/3">{TEXT_USER_GROUP}</td>
              <td className="flex">
                <UserInfoCardView>
                  {props.userDetails.userGroup}
                </UserInfoCardView>
              </td>
            </tr>
            <tr>
              <td className="w-1/3">{TEXT_ORGANIZATION}</td>
              <td className="flex">
                <UserInfoCardView>
                  {props.userDetails.organization}
                </UserInfoCardView>
              </td>
            </tr>
            <tr>
              <td className="w-1/3">{TEXT_TEAM}</td>
              <td className="flex">
                <UserInfoCardView>{props.userDetails.team}</UserInfoCardView>
              </td>
            </tr>
            <tr>
              <td className="w-1/3">{TEXT_PHONE_NUMBER}</td>
              <td className="flex">
                <UserInfoCardView>{props.userDetails.phone}</UserInfoCardView>
              </td>
            </tr>
            <tr>
              <td className="w-1/3">{TEXT_EMAIL_ADDRESS}</td>
              <td className="flex">
                <UserInfoCardView>{props.userDetails.email}</UserInfoCardView>
              </td>
            </tr>
            <tr>
              <td>
                <PrimaryButton icon="" label={(props.userDetails.mtStatus) ? "Deactivate" : "Activate"} onClick={(e) => {e.preventDefault();return handleActivateUser(props.userDetails.id);}}></PrimaryButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListingCardView;
