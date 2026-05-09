import { StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Sorter() {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.button}>
                <FontAwesome name="sliders" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <FontAwesome name="th-large" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 20,
    },

    button: {
        backgroundColor: "green",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        color: "white",
        fontSize: 18,
    },
});