import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputLabel from '../../../components/InputLabel'
import { authSignup } from '../../authentication/services/AuthenticationAction'

export default function SignupManageUser() {
    const toastRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading } = useSelector(state => state.authReducer)

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    })

    const handleSignup = (e) => {
        e.preventDefault()

        dispatch(authSignup(formData.username, formData.email, formData.password,
            () => {
                toastRef.current.show({ severity: 'success', summary: 'Success Message', detail: "Success", life: 3000 });
                // navigate("/auth/signin")
                window.location.reload();
            },
            (_respError) => {
                /** on error */
                toastRef.current.show({ severity: 'error', summary: 'Error Message', detail: _respError.message || "Failed to sign up", life: 3000 });
            }
        ))
    }

    return (
        <div className="flex justify-center w-full py-10">

            <Toast position='top-center' ref={toastRef} />

            <div className="flex flex-col lg:w-1/4 mx-auto sm:w-full">
                <div className="flex flex-col text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
                    <span className="text-600 font-medium line-height-3">Already have have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={() => navigate("/auth/signin")}>Sign in now!</a>
                </div>

                <form onSubmit={handleSignup}>
                    <InputLabel>Username</InputLabel>
                    <InputText id="email" type="text" className="w-full mb-3"
                               value={formData.username}
                               onChange={e => setFormData(_c => ({ ..._c, username: e.target.value }))} />

                    <InputLabel>Email</InputLabel>
                    <InputText id="email" type="email" className="w-full mb-3"
                               value={formData.email}
                               onChange={e => setFormData(_c => ({ ..._c, email: e.target.value }))} />

                    <InputLabel>Password</InputLabel>
                    <InputText id="password" type="password" className="w-full mb-3"
                               value={formData.password}
                               onChange={e => setFormData(_c => ({ ..._c, password: e.target.value }))} />

                    <InputLabel>Confirm Password</InputLabel>
                    <InputText id="confirmPassword" type="password" className="w-full mb-3"
                               value={formData.confirmPassword}
                               onChange={e => setFormData(_c => ({ ..._c, confirmPassword: e.target.value }))} />

                    <Button disabled={isLoading || formData.confirmPassword !== formData.password} label="Sign up" icon="pi pi-user" className="w-full" />
                </form>
            </div>
        </div>
    )
}