import {getOrganizationsList} from "../services/OrganizationAction";
import React, {useEffect, useState} from "react";
import InputLabel from "../../../components/FormComponents/InputLabel";
import InputTextBar from "../../../components/FormComponents/InputTextBar";
import DropdownBar from "../../../components/FormComponents/DropdownBar";
import {useDispatch} from "react-redux";
import {post} from "../../../helpers/ApiHelper";
import PrimaryButton from "../../../components/Button/PrimaryButton";


const AddOrganizationGroupPage = () => {
  const [organizationList, setOrganizationList] = useState();
  const [formData,setFormData] = useState();
  const [selectedOrganization, setOrganization] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchOrganizationList();
  }, []);

  const fetchOrganizationList = () => {
    dispatch(getOrganizationsList(
      (data) => {
        setOrganizationList(data);
      },
      (error) => {

      }));
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(postData(formData, (data) => {
      console.log(data)
    },
      (error)=> {
      console.log(error);
      })
    )
  }

  const postData = (userGroup, onSuccess, onError) => {
    return async (dispatch) => {
      const {data:resp} = await post("/api/org-group/create", userGroup, true);
      if(resp.success) {
        onSuccess(resp.data);
      }else {
        console.log(resp.error);
      }
    };
  }

  const onOrganizationChange = (e) => {
    setOrganization(e.value);
    setFormData(prevState => ({
      ...prevState,
      orgId: e.value
    }));
  }

  const organizations = organizationList ? Array.from(organizationList.map(
    organization => {
      return {
        name: organization.name,
        value: organization.id
      };
    }
  ))
  : [];

  return(
    <form className="w-full md:w-4/5 items-center bg-white rounded-lg mx-auto p-4 sm:p-10" onSubmit={handleSubmitForm}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>Name</InputLabel>
          <InputTextBar className="standardBar full"
                        onChange={e => setFormData(prevState => ({ ...prevState, name: e.target.value }))} />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <InputLabel>Code</InputLabel>
          <InputTextBar className="standardBar full"
                        onChange={e => setFormData(prevState => ({ ...prevState, code: e.target.value }))} />
        </div>
      </div>
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
      </div>
      <div className="container inline-flex flex-row pt-2">
        <div className="ml-auto flex">
          <PrimaryButton icon="pi pi-save" label={"submit"}></PrimaryButton>
        </div>
      </div>
    </form>
  );

}

export {AddOrganizationGroupPage};