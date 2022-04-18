import { Navigate, useLocation } from "react-router-dom";
import useAuthentication from "../modules/authentication/services/AuthenticationState";

export default function RequireAuth({ children }) {
    const { isLoggedIn } = useAuthentication()
    const location = useLocation()

    if (!isLoggedIn) {
        return <Navigate to={'/auth/signin'} state={{ from: location }} replace />
    }

    return children
}