import { StyleSheet, View, Text } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";


export default function HeaderPlus() {
    return (
        <View style={styles.container}>
             <Text style={styles.text}>
                 HAVA<FontAwesome5Icon name="bolt" solid style={styles.icon} />USE
                 <Text style={styles.plus}> PLUS</Text>
             </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: "green",
        borderWidth: 2,
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 20,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#3F4AA8",
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "serif",
    },
    icon: {
    color: 'green',
    fontSize: 22,
    fontFamily: "serif",
  },
    plus: {
        color: "green",
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "serif",
    }
});
