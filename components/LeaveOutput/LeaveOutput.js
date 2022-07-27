import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import LeaveList from "./LeaveList";

function LeaveOutput({ userEmail, leave, fallbackText }) {
    let content = <Text style={styles.fallbackTextStyle}>{fallbackText}</Text>;

    if (!!leave === true && Object.values(leave).length >0) {
        content = (
                <LeaveList userEmail={userEmail} leave={leave} />
        );
    }

    return <View style={styles.container}>{content}</View>;
}

export default LeaveOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
    }, fallbackTextStyle:{
        fontSize:18,
        fontWeight:"bold",
        marginTop:16
    }
});
