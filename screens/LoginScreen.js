import { useContext, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";

function LoginScreen() {
    const [isAuthenticting, setISAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function loginHandler({ email, password }) {
        setISAuthenticating(true);
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            alert("Authentication failed - Please check your credentials");
            setISAuthenticating(false);
        }
    }
    if (isAuthenticting) {
        return <LoadingOverlay message="Logging you in..." />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
