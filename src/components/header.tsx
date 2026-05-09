import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CartIconWithBadge from "./CartIconWithBadge";

export default function Header() {
    return (
        <View style={styles.header}>
            <FontAwesome5 name="bars" style={styles.barIcon} />
            <Text style={styles.text}>
                HAVA<FontAwesome5 name="bolt" solid style={styles.icon} />USE
            </Text>
            <CartIconWithBadge />
        </View>
    )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3F4AA8",
    fontFamily: "serif",
  },
  icon: {
    color: 'green',
    fontSize: 20,
    fontFamily: "serif",
  },
  barIcon: {
    color: '#3F4AA8',
    fontSize: 22,
    fontFamily: "serif",
  },
});