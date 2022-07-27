import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";

function SignupScreen() {
    const [isAuthenticting, setISAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function signupHandler({ email, password }) {
        setISAuthenticating(true);
        try {
            const response = await createUser(email, password);
            authCtx.authenticate(response.data.idToken);
        } catch (error) {
            alert("Authentication failed - Please check your input");
            setISAuthenticating(false);
        }
    }

    if (isAuthenticting) {
        return <LoadingOverlay message="Creating user..." />;
    }

    return (
        <View style={styles.container}>
            <AuthContent onAuthenticate={signupHandler} />
        </View>
    );
}

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center"
    }
})