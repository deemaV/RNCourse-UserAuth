import { View, FlatList, StyleSheet } from "react-native";
import LeaveItem from "./LeaveItem";

function renderLeaveItem(itemData) {
    return <LeaveItem {...itemData.item} />;
}

function LeaveList({ leave, userEmail }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={Object.values(leave)}
                renderItem={renderLeaveItem}
                keyExtractor={(item) => item[Object.keys(item)[1]]}
            />
        </View>
    );
}

export default LeaveList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
});
