import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { products } from "../data";

type ProductItem = (typeof products)[number]["items"][number];

type RecentViewProps = {
  title: string;
  items: ProductItem[];
};

export default function RecentView({ title, items }: RecentViewProps) {
  const navigation = useNavigation<any>();

  return (
    <View>
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <Pressable
              style={styles.seeAll}
              onPress={() => navigation.navigate("Details")}
            >
                <Text style={styles.seeAllText}>View All</Text>
                <FontAwesome name="angle-right" style={styles.icon} />
            </Pressable>
        </View>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        >
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        ) : (
          items.map((item, index) => (
            <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            {item.soldOut && (
                <View style={styles.badge}>
                <Text style={styles.badgeText}>Sold Out</Text>
                </View>
            )}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            </View>
          ))
        )}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 12,
    paddingVertical: 12,
    height: 180,
  },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "serif",
    },
    seeAll: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: "600",
        color: "green",
        fontFamily: "serif",
    },
    icon: {
        color: "green",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "serif",
    },
  card: {
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginRight: 10,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
  },

  name: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
    color: "#333",
  },

  price: {
    fontSize: 12,
    color: "green",
    marginTop: 2,
    fontWeight: "700",
  },

  badge: {
    position: "absolute",
    top: 8,
    left: 8,
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
  emptyState: {
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
});