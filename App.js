import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import BookLeave from "./screens/BookLeave";
import EditLeave from "./screens/EditLeave";
import AuthLeave from "./screens/AuthLeave"
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { Feather } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary800 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    const authCtx = useContext(AuthContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary800 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
                headerTitleAlign:"center",
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon="log-out"
                        color={tintColor}
                        size={24}
                        onPress={authCtx.logout}
                    />
                )
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerLeft: ({ tintColor }) => {
                        <Feather name="sun" color={tintColor} size={24} />
                    },
                    title: "Home Page"
                }}
            />
            <Stack.Screen 
                name="BookLeave"
                component={BookLeave}
                options={{title: "Book Leave"}}
            />
            <Stack.Screen 
                name="EditLeave"
                component={EditLeave}
                options={{title: "Edit Leave"}}
            />
            <Stack.Screen 
                name="AuthLeave"
                component={AuthLeave}
                options={{title: "Authorise Leave"}}
            />
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
    );
}

function Root() {
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function fetchToken() {
            const storedToken = await AsyncStorage.getItem("token");

            if (storedToken) {
                authCtx.authenticate(storedToken);
            }
            setIsTryingLogin(false);
        }
        fetchToken();
    }, []);

    if (isTryingLogin) {
        return <AppLoading />;
    }
    return <Navigation />;
}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <AuthContextProvider>
                <Root />
            </AuthContextProvider>
        </>
    );
}
