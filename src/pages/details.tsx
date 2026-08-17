import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { products } from "../data";

export default function Details() {
  const navigation = useNavigation<any>();
  const allProducts = products.flatMap((category) => category.items);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={10}
        >
          <FontAwesome5 name="arrow-left" style={styles.backIcon} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <Text style={styles.title}>All Products</Text>

        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {allProducts.map((item, index) => (
          <Pressable
            key={`${item.name}-${index}`}
            style={styles.card}
            onPress={() => navigation.navigate("DetailPage", { item })}
          >
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },

  backIcon: {
    fontSize: 16,
    color: "#3F4AA8",
    marginRight: 6,
  },

  backText: {
    fontSize: 16,
    color: "#3F4AA8",
    fontWeight: "600",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  placeholder: {
    width: 60,
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
  },

  price: {
    fontSize: 13,
    color: "green",
    marginTop: 3,
    fontWeight: "700",
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
  },
});