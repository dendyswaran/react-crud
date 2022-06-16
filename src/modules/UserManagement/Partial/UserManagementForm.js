import React, { useState, useEffect, useRef } from "react";
import InputLabel from "../../../components/FormComponents/InputLabel";
import InputTextBar from "../../../components/FormComponents/InputTextBar";
import IconCardHeader from "../../../components/Header/IconCardHeader";
import DropdownBar from "../../../components/FormComponents/DropdownBar";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import RadioButtonWithLabel from "../../../components/Button/RadioButtonWithLabel";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { genGetDataById, genGetAllData } from "../../../commons/GenericAction";
import { editUser } from "../services/ManageUserAction";
import { Toast } from 'primereact/toast';
import { getOrganizationsList } from "../services/OrganizationAction";
import { getTeamList } from "../services/TeamAction";


const UserManagementForm = (props) => {
  // IMPORTANT: need to preventDefault when submit form!
  // TODO: fix the id and input type of each respective fields have not been assigned.
  // TODO: Create a class called FormField that wrap all form input together with their labels --> then apply consistent padding.

  // Change User Group state
  const [userGroup, setUserGroup] = useState(null);
  const navigate = useNavigate();
  const userId = props.userId;


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
  const [user, setUser] = useState();
  const [userGroupList, setUserGroupList] = useState([]);

  useEffect(() => {
    fetchUser(userId);
    fetchOrganizationList();
    fetchTeamList();
    fetchUserGroupList();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.org && user.org.id) {
        organizationsList.map(organization => {
          if (organization.id === user.org.id) {
            setOrganization(organization.id);
          }
        });
      }
      if(user.orgUsrTeams && user.orgUsrTeams.length > 0 && teamList.length > 0) {
        let team = teamList.find(team => {
          return team.id === user.orgUsrTeams[0].orgTeam.id;
        });
        setTeam(team.id);
      }
    }
  }, [user]);

  const fetchUserGroupList = () => {
    dispatch(genGetAllData("/api/org-group",
      false,
      (e) => {
        setUserGroupList(e);
      }));
  }

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

  const fetchUser = (userId) => {
    dispatch(genGetDataById('api/org-user/get/' + userId,
      (data) => {
        // console.log(data);
        setUser(data);
        setFormData(prevState => ({
          ...prevState,
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password
        }));

      }
    ));
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
    dispatch(editUser(formData,
      () => {
        toastRef.current.show({ severity: 'success', summary: 'Update Success', detail: "Success updating user", life: 3000 });
        // window.location.reload();

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
  // [
  // { name: "PT Cellsite", value: "NY" },
  // ];

  const teams = Array.from(teamList.map(
    team => ({
      name: team.name,
      value: team.id
    })
  ));
  // [
  //   { name: "Team 1", value: "1" },
  // ]

  const viewUserGroups = () => {
    if(userGroupList && userGroupList.length > 0) {
      return userGroupList.map(
        element => {
          return(
            <div className="inline-flex mx-auto" key={element.id}>
              <div className="inline-flex field-radiobutton">
                <RadioButtonWithLabel
                  label= {element.name}
                  inputId={element.id + "_group"}
                  name={element.name}
                  value={element.id}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      orgUsrGroupId: e.value
                    }));
                    return setUserGroup(e.value);
                  }}
                  checked={userGroup === element.id}
                />
              </div>
            </div>
          );
        }
      );

    }
  }


  const myHeader = "Modify " + userId;


  return (
    <form className="w-full md:w-4/5 items-center bg-white rounded-lg mx-auto p-4 sm:p-10" onSubmit={handleSubmitForm}>
      <Toast position='top-center' ref={toastRef} />
      {/* Form Header */}
      <div className="pt-4 pb-8">
        <IconCardHeader header={myHeader} icon="pi-pencil" />
      </div>

      {/* User ID */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <InputLabel>User ID</InputLabel>
          <InputTextBar className="standardBar full" value={formData.id} disabled />
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <InputLabel>Name</InputLabel>
          <InputTextBar className="standardBar full" value={formData.name}
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

      {/* User Group */}
      <InputLabel>User Group</InputLabel>
      <div className="flex flex-wrap -mx-3 mb-6">

        {userGroupList && viewUserGroups()}

        {/*<div className="inline-flex mx-auto">
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
        </div>*/}
        {/*<div className="inline-flex mx-auto">
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
        </div>*/}
        {/*<div className="inline-flex mx-auto">
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
        </div>*/}
        {/*<div className="inline-flex mx-auto">
          <div className="inline-flex field-radiobutton">
            <RadioButtonWithLabel
              inputId="scrap_group"
              label="Scrap"
              name="group"
              value="scrap"
              onChange={(e) => setUserGroup(e.value)}
              checked={userGroup === "scrap"}
            />
          </div>
        </div>*/}
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
            value={formData.email}
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

export default UserManagementForm;
