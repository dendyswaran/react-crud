import React, { useState, useEffect, useRef } from "react";
import InputLabel from "../../../components/FormComponents/InputLabel";
import InputTextBar from "../../../components/FormComponents/InputTextBar";
import RadioButtonMain from "../../../components/Button/RadioButtonMain";
import IconCardHeader from "../../../components/Header/IconCardHeader";
import DropdownBar from "../../../components/FormComponents/DropdownBar";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import RadioButtonWithLabel from "../../../components/Button/RadioButtonWithLabel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { genGetDataById } from "../../../commons/GenericAction";

const UserManagementForm = (props) => {
  // IMPORTANT: need to preventDefault when submit form!
  // TODO: fix the id and input type of each respective fields have not been assigned.
  // TODO: Create a class called FormField that wrap all form input together with their labels --> then apply consistent padding.

  // Change User Group state
  const [userGroup, setUserGroup] = useState(null);

  const navigate = useNavigate();

  // Change organization state.
  // https://www.primefaces.org/primereact/selectbutton/
  const [selectedOrganization, setOrganization] = useState(null);
  const [selectedTeam, setTeam] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: ""
  });
  const dispatch = useDispatch();
  const toastRef = useRef();

  useEffect(() => {
    fetchUser(props.userId);
  }, [""]);

  const fetchUser = (userId) => {
    dispatch(genGetDataById('api/manage-user/'+userId,
        (result) => {
          setFormData(prevState => ({
            ...prevState,
            username: result.username,
            email: result.email,
            password: result.password
          }));
        }
    ));
  }

  const onOrganizationChange = (e) => {
    setOrganization(e.value);
  };

  const onTeamChange = (e) => {
    setTeam(e.value);
  };

  // TODO: This is to be populated with organization data drawn from DB.
  const organizations = [
    { name: "PT Cellsite", value: "NY" },
    { name: "PT Dexter", value: "RM" },
    { name: "Dummy 1", value: "LDN" },
    { name: "Dummy 2", value: "IST" },
    { name: "Dummy 3", value: "PRS" },
  ];

  const teams = [
    { name: "Team 1", value: "1" },
    { name: "Team 2", value: "2" },
    { name: "Team 3", value: "3" },
    { name: "Team 4", value: "4" },
    { name: "Team 5", value: "5" },
    { name: "Team 6", value: "6" },
    { name: "Team 7", value: "7" },
    { name: "Team 8", value: "8" },
    { name: "Team 9", value: "9" },
    { name: "Team 10", value: "10" },
    { name: "Team 11", value: "11" },
    { name: "Team 12", value: "12" },
    { name: "Team 13", value: "13" },
    { name: "Team 14", value: "14" },
    { name: "Team 15", value: "15" },
    { name: "Team 16", value: "16" },
    { name: "Team 17", value: "17" },
    { name: "Team 18", value: "18" },
    { name: "Team 19", value: "19" },
    { name: "Team 20", value: "20" },
  ];

  const myHeader = "Modify " + props.userId;

  
  return (
    <form className="w-full md:w-4/5 items-center bg-white rounded-lg mx-auto p-4 sm:p-10">
      {/* Form Header */}
      <div className="pt-4 pb-8">
        <IconCardHeader header={myHeader} icon="pi-pencil" />
      </div>

      {/* User ID */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <InputLabel>User ID</InputLabel>
          <InputTextBar className="standardBar full" />
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>First Name</InputLabel>
          <InputTextBar className="standardBar full" />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <InputLabel>Last Name</InputLabel>
          <InputTextBar className="standardBar full" />
        </div>
      </div>

      {/* User Group */}
      <InputLabel>User Group</InputLabel>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="inline-flex mx-auto">
          <div className="inline-flex field-radiobutton">
            <RadioButtonWithLabel
              label="IOH"
              inputId="ioh_group"
              name="group"
              value="ioh"
              onChange={(e) => setUserGroup(e.value)}
              checked={userGroup === "ioh"}
            />
          </div>
        </div>
        <div className="inline-flex mx-auto">
          <div className="inline-flex field-radiobutton">
            <RadioButtonWithLabel
              label="Decom"
              inputId="decom_group"
              name="group"
              value="decom"
              onChange={(e) => setUserGroup(e.value)}
              checked={userGroup === "decom"}
            />
          </div>
        </div>
        <div className="inline-flex mx-auto">
          <div className="inline-flex field-radiobutton">
            <RadioButtonWithLabel
              label="Scrap"
              inputId="scrap_group"
              name="group"
              value="scrap"
              onChange={(e) => setUserGroup(e.value)}
              checked={userGroup === "scrap"}
            />
          </div>
        </div>
        <div className="inline-flex mx-auto">
          <div className="inline-flex field-radiobutton">
            <RadioButtonWithLabel
              label="OEM"
              inputId="oem_group"
              name="group"
              value="oem"
              onChange={(e) => setUserGroup(e.value)}
              checked={userGroup === "oem"}
            />
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>organization</InputLabel>
          <DropdownBar
            value={selectedOrganization}
            options={organizations}
            onChange={onOrganizationChange}
            optionLabel="name"
            placeholder="Select an Organization"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>team</InputLabel>
          <DropdownBar
            value={selectedTeam}
            options={teams}
            onChange={onTeamChange}
            optionLabel="name"
            placeholder="Select a Team"
          />
        </div>
      </div>

      {/* Contact Details */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>Phone</InputLabel>
          <InputTextBar
            className="standardBar full"
            placeholder="e.g. 6212XXXXXXX"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>Email</InputLabel>
          <InputTextBar
            className="standardBar full"
            placeholder="e.g. sample@xxxx.com"
          />
        </div>
      </div>

      <div className="container inline-flex flex-row pt-2">
        <div className="ml-auto flex">
          <PrimaryButton icon="pi pi-save"></PrimaryButton>
          <PrimaryButton icon="pi pi-trash"></PrimaryButton>
        </div>
      </div>
    </form>
  ); 
};

export default UserManagementForm;
