import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useCart } from "../context/CartContext";

export default function CartIconWithBadge() {
  const { cartCount } = useCart();

  const label = cartCount > 99 ? "99+" : String(cartCount);

  return (
    <View style={styles.cartWrapper}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{label}</Text>
      </View>
      <FontAwesome5 name="shopping-cart" style={styles.cartIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  cartWrapper: {
    position: "relative",
  },
  cartIcon: {
    color: "green",
    fontSize: 22,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "red",
    fontFamily: "serif",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "serif",
  },
});
