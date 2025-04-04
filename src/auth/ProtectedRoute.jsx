import { AdminPanel } from "../dashboard/AdminPanel";
import LoginForm from "../loginForm/LoginForm";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
    const { user } = useAuth();

    // if (!authToken || isCookieExpired("auth_token")) {
    //   clearCookie("auth_token", { domain: ".stlnpl.com" });
    //   console.log("Token not found or expired");
    //   return <LoginForm />;
    // }

    if (!user) {
        return <LoginForm />
    }

    return <AdminPanel />;
};

export default ProtectedRoute;