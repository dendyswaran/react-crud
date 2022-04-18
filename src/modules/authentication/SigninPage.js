import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputLabel from '../../components/InputLabel'
import session from '../../configs/session'
import { authSignin } from './services/AuthenticationAction'


export default function SigninPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toastRef = useRef()
    const { isLoading, action } = useSelector(state => state.authReducer)

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        remember: false
    })

    const handleLogin = (e) => {
        e.preventDefault()

        dispatch(authSignin(formData.username, formData.password,
            (_respData) => {
                /** on success */ 
                toastRef.current.show({ severity: 'success', summary: 'Success Message', detail: _respData.message || "Welcome back!", life: 3000 });
                navigate("/")
            },
            (_respError) => {
                /** on error */
                toastRef.current.show({ severity: 'error', summary: 'Error Message', detail: _respError.message || "Invalid username or password", life: 3000 });
            }
        ))
    }

    return (
        <div className="flex justify-center w-full py-10">

            <Toast position='top-center' ref={toastRef} />

            <div className="flex flex-col lg:w-1/4 mx-auto sm:w-full">
                <div className="flex flex-col text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={() => navigate("/auth/signup")}>Create today!</a>
                </div>

                <form onSubmit={handleLogin}>
                    <InputLabel>Username</InputLabel>
                    <InputText id="email" type="text" className="w-full mb-3"
                        value={formData.username}
                        onChange={e => setFormData(_c => ({ ..._c, username: e.target.value }))} />

                    <InputLabel>Password</InputLabel>
                    <InputText id="password" type="password" className="w-full mb-3"
                        value={formData.password}
                        onChange={e => setFormData(_c => ({ ..._c, password: e.target.value }))} />

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" binary className="mr-2"
                                checked={formData.remember}
                                onChange={e => setFormData(_c => ({ ..._c, remember: e.target.checked }))} />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>

                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                    </div>

                    <Button disabled={isLoading} label="Sign In" icon="pi pi-user" className="w-full" />
                </form>
            </div>
        </div>
    )
}