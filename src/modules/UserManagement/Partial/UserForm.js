import React, { useState, useEffect, useRef } from "react";
import InputLabel from "../../../components/FormComponents/InputLabel";
import InputTextBar from "../../../components/FormComponents/InputTextBar";
import IconCardHeader from "../../../components/Header/IconCardHeader";
import DropdownBar from "../../../components/FormComponents/DropdownBar";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import RadioButtonWithLabel from "../../../components/Button/RadioButtonWithLabel";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector, useStore} from "react-redux";
import {genGetDataById, genGetAllData} from "../../../commons/GenericAction";
import {activateUser, deactivateUser, editUser} from "../services/ManageUserAction";
import { Toast } from 'primereact/toast';
import { getOrganizationsList } from "../services/OrganizationAction";
import { getTeamList } from "../services/TeamAction";
import {ConfirmDialog} from "primereact/confirmdialog";
import {authSignup} from "../../authentication/services/OrgAuthentication";
import {classNames} from "primereact/utils";
import {FORM_VALIDATOR} from "../services/FormValidatorConstants";
import FormValidator from "../services/FormValidator";

const UserForm = (props) => {
  // IMPORTANT: need to preventDefault when submit form!
  // TODO: fix the id and input type of each respective fields have not been assigned.
  // TODO: Create a class called FormField that wrap all form input together with their labels --> then apply consistent padding.

  // Change User Group state
  const navigate = useNavigate();
  const userId = props.userId ?? undefined;


  // Change organization state.
  // https://www.primefaces.org/primereact/selectbutton/
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    code: "",
    orgUsrGroupIds: []
  });
  const dispatch = useDispatch();
  const toastRef = useRef();
  const [organizationsList, setOrganizationList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [user, setUser] = useState();
  const [userGroupList, setUserGroupList] = useState([]);
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [validateError, setValidateError] =  useState({});
  const [submitBtnDisableState, setSubmitBtnState] = useState(false);

  useEffect(() => {
    if(userId) {
      fetchUser(userId);
    }
    fetchOrganizationList();
    fetchTeamList();
    fetchUserGroupList();
    formValidation();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.org && user.org.id) {
        organizationsList.forEach(organization => {
          if (organization.id === user.org.id) {
            setFormData(prevState => ({...prevState, orgId: organization.id}));
          }
        });
      }
      if(user.orgUsrTeams && user.orgUsrTeams.length > 0 && teamList.length > 0) {
        teamList.forEach(team => {
          if(team.id === user.orgUsrTeams[0].orgTeam.id) {
            setFormData(prevState => ({...prevState, orgTeamId: team.id}));
          }
        });
        // setTeam(team.id);
      }
      if(formData.orgUsrGroupIds.length > 0) {
        // console.log(formData.orgUsrGroupIds);
        setFormData(prevState => ({
          ...prevState,
          orgUsrGroupId: formData.orgUsrGroupIds[0]}));
      }
    }
  },[user]);

  const fetchUserGroupList = () => {
    dispatch(genGetAllData("/api/org-group",
      false,
      (e) => {
        setUserGroupList(e);
      }));
  }

  /******
    commented below is the code to generate the user group selection
    based on the group that has been chosen
  */
  /*
  useEffect(() => {
    if(selectedOrganization) {
      fetchUserGroupListBasedOnOrg(selectedOrganization);
    }
  },[selectedOrganization]);


  const fetchUserGroupListBasedOnOrg = (orgId) => {
    dispatch(genGetAllData("/api/org-group/org/"+orgId,
        false,
        (data) => {
          setUserGroupList(data);
        }));
  }*/


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
          code: data.code,
          email: data.email,
          password: data.password,
          mtStatus:  data.mtStatus ? data.mtStatus.code === "01" : false,
          orgUsrGroupIds: (data.orgUsrUsrGroups && data.orgUsrUsrGroups.length > 0)
            ? Array.from(data.orgUsrUsrGroups.map(orgUsrUsrGroup =>  (orgUsrUsrGroup.orgUsrGroup.id)))
            : [],
        }));
      }
    ));
  }


  const onInputChange = (e) => {
    setFormData((prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    })))
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if(userId) {
    dispatch(editUser(formData,
      () => {
        toastRef.current.show({ severity: 'success', summary: 'Update Success', detail: "Success updating user", life: 3000 });
        // window.location.reload();

      },
      (error) => {
        toastRef.current.show({ severity: 'error', summary: 'Error Message', detail: error.message || "Failed to edit User", life: 3000 });
      })
    );
    } else {
      dispatch(authSignup(formData,
          () => {
            toastRef.current.show({ severity: 'success', summary: 'Register Success', detail: "New User Successfully added", life: 3000 });
            // window.location.reload("");
            navigate("/user-management");
          },
          (error) => {
            toastRef.current.show({ severity: 'error', summary: 'Error Message', detail: error.message || "Failed to edit User", life: 3000 });
          })
      );
    }
  }

  useEffect(() => {
    formValidation();
  }, [formData]);

  useEffect(() => {
    console.log(validateError);
    if(Object.keys(validateError).length > 0) {
      let flag = false;
      for(const key in validateError) {
        flag = validateError[key].length !== 0;
        if(flag) {
          break;
        }
      }
      setSubmitBtnState(flag);
    }
  }, [validateError])

  const formValidation = () => {
    /**
     * This array is to be constructed to use with the FormValidator
     * @type {[{types: string[], fieldName: string, payload: string},{types: (string)[], fieldName: string, payload: string},{types: string[], fieldName: string, payload: string}]}
     */
    let checkVal = [
      {
        types: [FORM_VALIDATOR.REQUIRED],
        payload: formData.name,
        fieldName: "name"
      },
      {
        types: [FORM_VALIDATOR.REQUIRED, FORM_VALIDATOR.EMAIL],
        payload: formData.email,
        fieldName: "email"
      },
      {
        types: [FORM_VALIDATOR.REQUIRED],
        payload: formData.code,
        fieldName: "code"
      },

    ];
    if(window.location.pathname.indexOf("signup") > 0) {
      checkVal = [
        ...checkVal,
        {
          types: [FORM_VALIDATOR.REQUIRED, FORM_VALIDATOR.MIN_LENGTH],
          payload: formData.password,
          fieldName: "password",
          adds: [{
            minLength:3
          }]
        }
      ]
    }
    dispatch(FormValidator(checkVal, (validateResponse) => {
      setValidateError(validateResponse);
    }));
  }

  const handleActivateUser = () => {
    console.log("delete");

    if(formData.id && formData.id.length > 0) {
      if(formData.mtStatus) {
        dispatch(deactivateUser(formData.id, () => {
          toastRef.current.show({
            severity: 'error',
            summary: 'Delete Successful',
            detail: "User Successfully Delete",
            life: 3000
          });
          navigate("/user-management")
        }, (error) => {
          console.log(error);
        }));
      }else {
        dispatch(activateUser(formData.id, () => {
          toastRef.current.show({
            severity: 'error',
            summary: 'Delete Successful',
            detail: "User Successfully Delete",
            life: 3000
          });
          navigate("/user-management")
        }, (error) => {
          console.log(error);
        }));
      }
    }
  }

  // TODO: This is to be populated with organization data drawn from DB.
  const organizations = (organizationsList && organizationsList.length > 0) ? Array.from(organizationsList.map(
    organization => {
      return {
        name: organization.name,
        value: organization.id
      };
    }
  )): [];

  const teams = teamList ? Array.from(teamList.map(
    team => ({
      name: team.name,
      value: team.id
    })
  )) : [];

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
                  name={"orgUsrGroupId"}
                  value={element.id}
                  onChange={onInputChange}
                  checked={formData.orgUsrGroupId === element.id}
                  // required
                />
              </div>
            </div>
          );
        }
      );

    }
  }

  const invalidInput = (fieldName) => {
    return classNames((validateError[fieldName] ? "p-invalid" : ""));
  }

  const myHeader = userId ? "Modify " + userId : "Register New User";


  return (
    <form className="w-full md:w-4/5 items-center bg-white rounded-lg mx-auto p-4 sm:p-10" onSubmit={handleSubmitForm}>
      <Toast position='top-center' ref={toastRef} />
      <ConfirmDialog visible={showActivateDialog} onHide={()=> setShowActivateDialog(false)} message={() => { return formData.mtStatus ? "Are you sure you want to deactivate this user?" : "Are you sure you want to activate this user?"}}
                     header="Confirmation" icon="pi pi-exclamation-triangle" reject={() => setShowActivateDialog(false)} accept={handleActivateUser}/>
      {/* Form Header */}
      <div className="pt-4 pb-8">
        <IconCardHeader header={myHeader} icon="pi-pencil" />
      </div>

      {/* User ID */}
      {/*{userId && (<div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <InputLabel>User ID</InputLabel>
          <InputTextBar className="standardBar full" value={formData.id} disabled />
        </div>
      </div>)}*/}

      {/* User Code*/}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <InputLabel>User Code</InputLabel>
          <InputTextBar className={`standardBar full ${invalidInput("code")}`}
                        value={formData.code}
                        name={"code"}
                        onChange={onInputChange}
                        // onChange={onCodeChange}
                        // required
          />
          {validateError.code &&
            <p className="mt-2 text-pink-600 text-sm">
              {validateError.code}
            </p>
          }
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <InputLabel>Name</InputLabel>
          <InputTextBar className={`standardBar full ${invalidInput("name")}`} //`standardBar full `
                        value={formData.name}
                        name={"name"}
            onChange={onInputChange}/>
          {validateError.name &&
            <p className="mt-2 text-pink-600 text-sm">
              {validateError.name}
            </p>
          }
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

      {/*Password*/}
      {window.location.pathname.indexOf("signup") > 0 && (<div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <InputLabel>Password</InputLabel>
          <InputTextBar type="password"
                        className={`standardBar full ${invalidInput("password")}`}
                        name={"password"}
                        onChange={onInputChange}/>
          {validateError.password &&
            <p className="mt-2 text-pink-600 text-sm">
              {validateError.password}
            </p>
          }
        </div>
      </div>)}

      {/* User Group */}
      <InputLabel>User Group</InputLabel>
      <div className="flex flex-wrap -mx-3 mb-6">

        {userGroupList && viewUserGroups()}

      </div>

      {/* Contact Details */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>organization</InputLabel>
          <DropdownBar
            value={formData.orgId}
            options={organizations}
            name={"orgId"}
            // onChange={onInputChange}
            onChange={onInputChange}
            optionLabel="name"
            placeholder="Select an Organization"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>team</InputLabel>
          <DropdownBar
            value={formData.orgTeamId}
            options={teams}
            onChange={onInputChange}
            name={"orgTeamId"}
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
            className="standardBar full" name={"phoneNumber"} onChange={onInputChange}
            placeholder="e.g. 6212XXXXXXX"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>Email</InputLabel>
          <InputTextBar
            className={`standardBar full ${invalidInput("email")}`}
            placeholder="e.g. sample@xxxx.com"
            value={formData.email} name={"email"}
            onChange={onInputChange}
            // required
          />
          {validateError.email &&
            <p className="mt-2 text-pink-600 text-sm">
              {validateError.email}
            </p>
          }
        </div>
      </div>

      <div className="container inline-flex flex-row pt-2">
        <div className="ml-auto flex">
          <PrimaryButton icon="pi pi-save" label={"Save"} type={"submit"} disabled={submitBtnDisableState}></PrimaryButton>
          {user &&
              <PrimaryButton icon="" label={(formData.mtStatus) ? "Deactivate" : "Activate"} onClick={(e) => {
                e.preventDefault();
                return handleActivateUser();
              }}></PrimaryButton>
          }
        </div>
      </div>
    </form>
  );
};

export default UserForm;
