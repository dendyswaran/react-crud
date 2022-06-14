import React, { useState, useEffect, useRef } from "react";
import InputLabel from "../../components/FormComponents/InputLabel";
import InputTextBar from "../../components/FormComponents/InputTextBar";
import IconCardHeader from "../../components/Header/IconCardHeader";
import DropdownBar from "../../components/FormComponents/DropdownBar";
import PrimaryButton from "../../components/Button/PrimaryButton";
import RadioButtonWithLabel from "../../components/Button/RadioButtonWithLabel";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toast } from 'primereact/toast';
import { getOrganizationsList } from "../UserManagement/services/OrganizationAction";
import { getTeamList } from "../UserManagement/services/TeamAction";
import Layout from "../../components/Layout";
import { authSignup } from "./services/OrgAuthentication";


const SignUpOrgContent = (props) => {
  // IMPORTANT: need to preventDefault when submit form!
  // TODO: fix the id and input type of each respective fields have not been assigned.
  // TODO: Create a class called FormField that wrap all form input together with their labels --> then apply consistent padding.

  // Change User Group state
  const [userGroup, setUserGroup] = useState(null);
  const navigate = useNavigate();


  // Change organization state.
  // https://www.primefaces.org/primereact/selectbutton/
  const [selectedOrganization, setOrganization] = useState();
  const [selectedTeam, setTeam] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: ""
  });
  const dispatch = useDispatch();
  const toastRef = useRef();
  const [organizationsList, setOrganizationList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    fetchOrganizationList();
    fetchTeamList();

  }, []);

  const fetchOrganizationList = () => {
    dispatch(getOrganizationsList(
      (data) => {
        setOrganizationList(data);
      },
      (error) => {

      }));
  }

  const fetchTeamList = () => {
    dispatch(getTeamList(
      (data) => {
        setTeamList(data);
      },
      (error) => {

      }
    ))
  }


  const onOrganizationChange = (e) => {
    setOrganization(e.value);
    setFormData(prevState => ({
      ...prevState,
      orgId: e.value
    }));
  };

  const onTeamChange = (e) => {
    setTeam(e.value);
    setFormData(prevState => ({
      ...prevState,
      orgTeamId: e.value
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(authSignup(formData,
      () => {
        toastRef.current.show({ severity: 'success', summary: 'Register Success', detail: "New User Succesfully added", life: 3000 });
        // window.location.reload("");
        navigate("/user-management");
      },
      (error) => {
        toastRef.current.show({ severity: 'error', summary: 'Error Message', detail: error.message || "Failed to edit User", life: 3000 });
      })
    );
  }

  // TODO: This is to be populated with organization data drawn from DB.
  const organizations = Array.from(organizationsList.map(
    organization => {
      return {
        name: organization.name,
        value: organization.id
      };
    }
  ));

  const teams = Array.from(teamList.map(
    team => ({
      name: team.name,
      value: team.id
    })
  ));

  const myHeader = "Add User";


  return (
    <form className="w-full md:w-4/5 items-center bg-white rounded-lg mx-auto p-4 sm:p-10" onSubmit={handleSubmitForm}>
      <Toast position='top-center' ref={toastRef} />
      {/* Form Header */}
      <div className="pt-4 pb-8">
        <IconCardHeader header={myHeader} icon="pi-pencil" />
      </div>

      {/* User ID */}
      {/* <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <InputLabel>User ID</InputLabel>
          <InputTextBar className="standardBar full" disabled />
        </div>
      </div> */}

      {/* Name */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <InputLabel>Name</InputLabel>
          <InputTextBar className="standardBar full"
            onChange={e => setFormData(prevState => ({ ...prevState, name: e.target.value }))} />
        </div>
        {/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>First Name</InputLabel>
          <InputTextBar className="standardBar full" value={formData.name}
            onChange={e => setFormData(prevState => ({ ...prevState, name: e.target.value }))} />
        </div> */}
        {/* <div className="w-full md:w-1/2 px-3">
          <InputLabel>Last Name</InputLabel>
          <InputTextBar className="standardBar full" />
        </div> */}
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <InputLabel>Password</InputLabel>
          <InputTextBar type="password" className="standardBar full"
            onChange={e => setFormData(prevState => ({ ...prevState, password: e.target.value }))} />
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
            onChange={e => setFormData(prevState => ({ ...prevState, email: e.target.value }))}
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

const SignUpOrgUser  = () => {
    return (
        <Layout>
            <SignUpOrgContent />
        </Layout>
    );
}

export default SignUpOrgUser;
