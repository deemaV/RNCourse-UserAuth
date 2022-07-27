import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import IconTextButton from "../components/ui/IconTextButton";
import {Colors} from "../constants/styles"

function WelcomeScreen({navigation}) {
    const [fetchedMessage, setFetchedMessage] = useState("");

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    function bookLeaveHandler() {
        navigation.navigate("BookLeave")
    }
    function editLeaveHandler() {
        navigation.navigate("EditLeave")
    }
    function authLeaveHandler() {
        navigation.navigate("AuthLeave")
    }

    useEffect(() => {
        axios
            .get(
                "https://react-native-course-cb449-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" +
                    token
            )
            .then((response) => {
                setFetchedMessage(response.data);
            });
    }, [token]);

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={{marginBottom:8}}>You authenticated successfully!</Text>
            <Text>{fetchedMessage}</Text>
            <IconTextButton size={24} icon="briefcase" color={Colors.primary500} onPress={bookLeaveHandler}>
                Book Leave
            </IconTextButton>
            <IconTextButton size={24} icon="edit" color={Colors.primary500} onPress={editLeaveHandler}>
                Edit Current Leave
            </IconTextButton>
            <IconTextButton size={24} icon="user-check" color={Colors.primary500} onPress={authLeaveHandler}>
                Authorise Leave
            </IconTextButton>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
});
