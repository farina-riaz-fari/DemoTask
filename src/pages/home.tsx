import React, { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
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
  const { height } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const shouldScroll = height < 760;

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
          normalize(item.name).includes(query),
        );
      }) || null
    );
  }, [query]);

  const activeCategory = matchedSection?.category || selectedCategory;
  const activeSection = activeCategory
    ? products.find((section) => section.category === activeCategory) || null
    : null;
  const recentItems = products.flatMap((cat) => cat.items).slice(0, 5);

  const visibleItems = useMemo(() => {
    if (!query) {
      return activeSection ? activeSection.items : recentItems;
    }
    if (!matchedSection) {
      return [];
    }
    if (normalize(matchedSection.category).includes(query)) {
      return matchedSection.items;
    }
    return matchedSection.items.filter((item) =>
      normalize(item.name).includes(query),
    );
  }, [activeSection, matchedSection, query, recentItems]);

  const onSelectCategory = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    setSearchText("");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      scrollEnabled={shouldScroll}
    >
      <View style={styles.cardWrap}>
        <View style={styles.card}>
          <Header />
          <SearchBar value={searchText} onChangeText={setSearchText} />
        </View>
      </View>
      <Sorter />
      <HeaderPlus/>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "visible",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 10,
    overflow: "visible",
  },

  /** Gives the header card room so the bottom shadow isn’t clipped by ScrollView. */
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
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.14,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
});