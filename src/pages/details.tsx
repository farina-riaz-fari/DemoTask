import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { products } from "../data";

export default function Details() {
  const navigation = useNavigation<any>();
  const allProducts = products.flatMap((category) => category.items);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" style={styles.backIcon} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.title}>All Products</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {allProducts.map((item, index) => (
          <Pressable key={`${item.name}-${index}`} style={styles.card} onPress={() => navigation.navigate("DetailPage", { item })}>
            <Image source={item.image} style={styles.image} />
            {item.soldOut && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Sold Out</Text>
              </View>
            )}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backIcon: {
    color: "#3F4AA8",
    fontSize: 22,
    fontFamily: "serif",
  },
  backText: {
    color: "#3F4AA8",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "serif",
  },
  title: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "serif",
  },
  placeholder: {
    width: 40,
  },
  list: {
    padding: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 110,
    borderRadius: 10,
    resizeMode: "cover",
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
    color: "#333",
    fontFamily: "serif",
  },
  price: {
    fontSize: 13,
    color: "green",
    marginTop: 3,
    fontWeight: "700",
    fontFamily: "serif",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "red",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "serif",
  },
});
