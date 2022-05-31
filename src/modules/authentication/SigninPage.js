import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputLabel from "../../components/InputLabel";
import session from "../../configs/session";
import { authSignin } from "./services/AuthenticationAction";
import IohLogo from "../../components/IohLogo";
import PrimaryHeader from "../../components/UI/PrimaryHeader";
import loginBackground from "../../images/login_bg01.jpeg";
import "../../assets/index.css";

export default function SigninPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastRef = useRef();
  const { isLoading, action } = useSelector((state) => state.authReducer);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();

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


    dispatch(
      authSignin(
        formData.username,
        formData.password,
        (_respData) => {
          /** on success */
          toastRef.current.show({
            severity: "success",
            summary: "Success Message",
            detail: _respData.message || "Welcome back!",
            life: 3000,
          });
          navigate("/");
        },
        (_respError) => {
          /** on error */
          toastRef.current.show({
            severity: "error",
            summary: "Error Message",
            detail: _respError.message || "Invalid username or password",
            life: 3000,
          });
        }
      )
    );
  };

  return (
    <div className="flex h-screen w-screen mx-auto my-auto align-middle p-5">
      <div className="container bg-white rounded-xl mx-auto my-auto lg:w-4/5 grid grid-cols-3 drop-shadow-2xl">
        <div className="col-start-1 col-span-1 hidden lg:block">
          <img
            className="login-background"
            src={loginBackground}
            alt="login page background"
          />
        </div>
        <div className="flex col-span-3 lg:col-start-2 lg:col-span-2 py-10 my-auto">
          <div className="w-full">
            <Toast position="top-center" ref={toastRef} />
            <div className="flex flex-col lg:w-3/5 m-auto w-4/5">
              <div className="flex flex-col text-center mb-5">
                <IohLogo width="200" height="90" />
                <div className="pt-5">
                  <PrimaryHeader secondary="Sign in to your account"></PrimaryHeader>
                </div>
              </div>
              <form onSubmit={handleLogin}>
                <div className="pb-5">
                  <InputLabel>User ID</InputLabel>
                  <InputText
                    placeholder="Enter User ID"
                    id="email"
                    type="text"
                    className="w-full mb-3"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData((_c) => ({
                        ..._c,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="py-5">
                  <InputLabel>Password</InputLabel>
                  <InputText
                    placeholder="Enter Password"
                    id="password"
                    type="password"
                    className="w-full mb-3"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((_c) => ({
                        ..._c,
                        password: e.target.value,
                      }))
                    }
                  />
                  <a className="font-medium no-underline ml-2 text-red-800 hover:text-red-500 text-right cursor-pointer text-sm">
                    Forgot your password?
                  </a>
                </div>
                <div className="inline-flex flex-wrap items-center justify-between pt-5">
                  <div className="flex align-items-center">
                    <Checkbox
                      id="rememberme"
                      binary
                      className="mr-2"
                      checked={formData.remember}
                      onChange={(e) =>
                        setFormData((_c) => ({
                          ..._c,
                          remember: e.target.checked,
                        }))
                      }
                    />
                    <label htmlFor="rememberme" className="pt-1">
                      Remember me
                    </label>
                  </div>
                </div>
                <Button
                  disabled={isLoading}
                  label="Sign In"
                  icon="pi pi-sign-in"
                  className="w-full btn secondary"
                />
                <div className="inline-flex flex-wrap">
                  <div className="flex pr-10 md:pr-0">
                    <a
                      className="font-medium no-underline text-red-800 hover:text-red-500 cursor-pointer text-sm ml-2"
                      onClick={() => navigate("/auth/signup")}
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
                <div className="container inline-flex items-center">
                  <div className="mx-auto">
                    <PrimaryHeader secondary="Terms of use. Privacy policy"></PrimaryHeader>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
