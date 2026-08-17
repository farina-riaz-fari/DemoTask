import React, { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import Sorter from "../components/sorter";
import HeaderPlus from "../components/headerPlus";
import ImageSlider from "../components/imageSlider";
import ScrollTabs from "../components/scrollTabs";
import RecentView from "../components/recentView";
import { products } from "../data";

const normalize = (value: string) => value.trim().toLowerCase();

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const query = normalize(searchText);

  const matchedSection = useMemo(() => {
    if (!query) {
      return null;
    }
    return (
      products.find((section) => {
        if (normalize(section.category).includes(query)) {
          return true;
        }
        return section.items.some((item) =>
          normalize(item.name).includes(query)
        );
      }) || null
    );
  }, [query]);

  const activeCategory =
    matchedSection?.category || selectedCategory;

  const activeSection = activeCategory
    ? products.find(
        (section) => section.category === activeCategory
      ) || null
    : null;

  const recentItems = products
    .flatMap((cat) => cat.items)
    .slice(0, 5);

  const visibleItems = useMemo(() => {
    if (!query) {
      return activeSection
        ? activeSection.items
        : recentItems;
    }
    if (!matchedSection) {
      return [];
    }
    if (normalize(matchedSection.category).includes(query)) {
      return matchedSection.items;
    }
    return matchedSection.items.filter((item) =>
      normalize(item.name).includes(query)
    );
  }, [
    activeSection,
    matchedSection,
    query,
    recentItems,
  ]);

  const onSelectCategory = (category: string) => {
    setSelectedCategory((prev) =>
      prev === category ? null : category
    );

    setSearchText("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* FIXED HEADER*/}
      <View style={styles.cardWrap}>
        <View style={styles.card}>
          <Header />

          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Sorter />
        <HeaderPlus />
        <ImageSlider />
        <View>
          <ScrollTabs
            selectedCategory={activeCategory}
            onSelectCategory={onSelectCategory}
          />
        </View>
        <RecentView
          title={
            matchedSection
              ? matchedSection.category
              : activeSection
                ? activeSection.category
                : "Recently Viewed"
          }
          items={visibleItems}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },


  cardWrap: {
    overflow: "visible",
    paddingBottom: Platform.OS === "android" ? 12 : 8,
    marginBottom: 4,
    zIndex: 2,
  },
  card: {
    padding: 20,
    height: 130,
    backgroundColor: "#fff",
    paddingBottom: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.14,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});