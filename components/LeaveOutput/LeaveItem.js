import { useContext, useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { database } from "../../firebase";
import { ref, set } from "firebase/database";
import { AuthContext } from "../../store/auth-context";

function LeaveItem({ id, startDate, endDate, totalDays }) {
    const authCtx = useContext(AuthContext);
    const fullEmail = authCtx.email;
    const userEmail = fullEmail.split(".").join("");
    const leaveRef = userEmail + "/" + id
    
    function pressHandler(database, leaveRef) {
        console.log("Deleted leave in location",leaveRef)
        set(ref(database, leaveRef), null);
    }

    return (
        <Pressable
            onPress={() => pressHandler(database, leaveRef)}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <Text>Start Date</Text>
                    <Text style={styles.dateText}>{startDate}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text>End Date</Text>
                    <Text style={styles.dateText}>{endDate}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text>Days</Text>
                    <Text style={styles.dateText}>{totalDays}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default LeaveItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        backgroundColor: "white",
        borderRadius: 8,
        marginVertical: 8,
        borderColor: "#D48166",
        borderWidth: 2,
    },
    dateContainer: {
        flexDirection: "column",
        alignItems: "center",
        margin: 8,
        marginRight: 12,
    },
    totalContainer: {
        margin: 8,
    },
    dateText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    totalText: {
        fontSize: 18,
    },
    pressed: {
        opacity: 0.75,
    },
});
