import { useState } from "react";
import UserInfoCardView from "./UserInfoCardView";
import IconCardHeader from "../UI/IconCardHeader";
import { InputSwitch } from "primereact/inputswitch";
import PrimaryButton from "../UI/PrimaryButton";

// field names
const TEXT_NAME = "Name";
const TEXT_USER_GROUP = "User Group";
const TEXT_TEAM = "Team";
const TEXT_ORGANIZATION = "Organization";
const TEXT_PHONE_NUMBER = "Phone No";
const TEXT_EMAIL_ADDRESS = "Email";

const UserListingCardView = (props) => {
  const [checked, setChecked] = useState(true);

  return (
    // TODO: Change table structure to grid --> when phone screen is small --> split into 2 rows (until 320px can fit)
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
              <PrimaryButton icon="pi pi-pencil"></PrimaryButton>
              <PrimaryButton icon="pi pi-trash"></PrimaryButton>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListingCardView;
