import { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    email: "",
    emailFunc: (email) => {},
    authenticate: (token) => {},
    logout: () => {},
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [emailAdd, setEmailAdd] = useState();

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem("token", token);
    }

    function emailFunc(email) {
        setEmailAdd(email)
        AsyncStorage.setItem("email", email)
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem("token");
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        email: emailAdd,
        emailFunc: emailFunc,
        authenticate: authenticate,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthContextProvider;
