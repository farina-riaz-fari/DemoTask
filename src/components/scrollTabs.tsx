import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { categories } from "../data";

type ScrollTabsProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
};

export default function Categories({
  selectedCategory,
  onSelectCategory,
}: ScrollTabsProps) {
  const data = categories;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {data.map((item, index) => (
        <Pressable
          key={index}
          style={styles.tab}
          onPress={() => onSelectCategory(item.name)}
        >
          <View
            style={[
              styles.iconCircle,
              selectedCategory === item.name && styles.iconCircleActive,
            ]}
          >
            <Icon name={item.icon} size={18} color="#fff" />
          </View>

          <Text style={styles.text}>{item.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },

  tab: {
    alignItems: "center",
    width: 60,
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleActive: {
    backgroundColor: "#3F4AA8",
    transform: [{ scale: 1.03 }],
  },

  text: {
    marginTop: 6,
    fontSize: 9,
    fontWeight: "bold",
    color: "#4A4A4A",
    textAlign: "center",
    fontFamily: "serif",
  },
});