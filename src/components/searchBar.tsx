import { View, TextInput, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.searchBar}>
                <MaterialCommunityIcons name="magnify" style={styles.icon} />
                <TextInput
                    placeholder="Search for products"
                    placeholderTextColor="#3F4AA8"
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                />
                <MaterialCommunityIcons name="microphone-outline" style={styles.icon} />
                <MaterialCommunityIcons name="google-lens" style={styles.icon} />
            </View>
            <View style={styles.bottomRow}>
                <FontAwesome
                    name="camera"
                    style={styles.bottomIcon}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#3F4AA8",
        height: 40,
        paddingHorizontal: 8,
        flex: 1,
        fontFamily: "serif",
    },
    icon: {
        color: "#3F4AA8",
        fontSize: 24,
        marginHorizontal: 6,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#3F4AA8",
        fontFamily: "serif",
    },
    bottomRow: {
        alignItems: "flex-end",
    },
    bottomIcon: {
        color: "#3F4AA8",
        fontSize: 22,
    },
});