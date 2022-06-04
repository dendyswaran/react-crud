import { InputText } from "primereact/inputtext";
import InputLabel from "../../components/FormComponents/InputLabel";
import Layout from "../../components/Layout";
import useAuthentication from "../authentication/services/AuthenticationState";

export default function MyAccountPage() {
    const { user } = useAuthentication()
    return (
        <Layout>
            <div className="flex flex-col max-w-sm p-3">
                <div className="flex justify-between">
                    <div className="flex flex-col mr-3">
                        <InputLabel>Username</InputLabel>
                        <InputText type="text" className="w-full mb-3"
                            name="username"
                            disabled
                            value={user.username} />
                    </div>

                    <div className="flex flex-col mr-3">
                        <InputLabel>Email</InputLabel>
                        <InputText type="text" className="w-full mb-3"
                            name="email"
                            disabled
                            value={user.email} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}