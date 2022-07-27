import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";

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
            const response = await login(email, password);
            authCtx.authenticate(response.data.idToken);
            authCtx.emailFunc(response.data.email);
        } catch (error) {
            alert("Authentication failed - Please check your credentials");
            setISAuthenticating(false);
        }
    }
    if (isAuthenticting) {
        return <LoadingOverlay message="Logging you in..." />;
    }

    return (
        <View style={styles.container}>
            <AuthContent isLogin onAuthenticate={loginHandler} />
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center"
    },
});
