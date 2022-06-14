import {useEffect} from 'react';
import InputLabel from "../../../components/FormComponents/InputLabel";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {editUser} from '../../UserManagement/services/ManageUserAction';
import {Toast} from 'primereact/toast';
import {genGetDataById} from "../../../commons/GenericAction";

const EditUserPage = (props) => {
    const toastRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userId} = props;
    const {isLoading} = useSelector(state => state.authReducer);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        fetchUser(userId);
    }, []);

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

    const handleEditUser = (e) => {
        e.preventDefault();
        dispatch(editUser(userId, formData.username, formData.email, 
            ()=> {
                toastRef.current.show({ severity: 'success', summary: 'Success Message', detail: "Success", life: 3000 });
                window.location.reload();
            }, (error) => {
                toastRef.current.show({ severity: 'error', summary: 'Error Message', detail: error.message || "Failed to edit User", life: 3000});
            }));
    }

    return(
        <>
            <Toast position='top-center' ref={toastRef} />
            <div>
                <form onSubmit={handleEditUser}>
                    <InputLabel>Username</InputLabel>
                    <InputText id="username" type="text" className="w-full mb-3"
                               value={formData.username}
                               onChange={e => setFormData(_c => ({ ..._c, username: e.target.value }))} />

                    <InputLabel>Email</InputLabel>
                    <InputText id="email" type="email" className="w-full mb-3"
                               value={formData.email}
                               onChange={e => setFormData(_c => ({ ..._c, email: e.target.value }))} />

                    {/*<InputLabel>Password</InputLabel>*/}
                    {/*<InputText id="password" type="password" className="w-full mb-3"*/}
                    {/*           value={formData.password}*/}
                    {/*           onChange={e => setFormData(_c => ({ ..._c, password: e.target.value }))} />*/}

                    {/*<InputLabel>Confirm Password</InputLabel>*/}
                    {/*<InputText id="confirmPassword" type="password" className="w-full mb-3"*/}
                    {/*           value={formData.confirmPassword}*/}
                    {/*           onChange={e => setFormData(_c => ({ ..._c, confirmPassword: e.target.value }))} />*/}

                    <Button disabled={isLoading || formData.confirmPassword !== formData.password} label="Edit User" icon="pi pi-user" className="w-full" />
                </form>
            </div>
        </>
    );
}

const EditUserPageWrapped = () => {
    const {userId} = useParams();
    return (
        <EditUserPage userId={userId}/>
    );
}

export {EditUserPageWrapped};
export default EditUserPage;
