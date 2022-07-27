import { Pressable, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

function IconTextButton({ children, icon, color, size, onPress }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Text>{children}</Text>
            <Feather name={icon} color={color} size={size} />
        </Pressable>
    );
}

export default IconTextButton;

const styles = StyleSheet.create({
    button: {
        width:"75%",
        maxWidth:270,
        margin: 8,
        paddingHorizontal:8,
        paddingVertical:4,
        borderRadius: 5,
        backgroundColor:"#ffffff",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    pressed: {
        opacity: 0.7,
    },
});
