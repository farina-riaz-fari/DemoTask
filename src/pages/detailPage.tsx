import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CartIconWithBadge from "../components/CartIconWithBadge";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

export default function DetailPage({ route }: any) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => Math.min(10, q + 1));
  const showToast = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  const onAddToCart = () => {
    addToCart(quantity);
    showToast("Added successfully");
    setQuantity(1);
  };
  const handleBuyNow = () => {
    setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 1500);
  };
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={10}
          >
            <FontAwesome5
              name="chevron-left"
              style={styles.backIcon}
            />
          </Pressable>
          <Text style={styles.text}>Details</Text>
          <CartIconWithBadge />
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Product Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={route.params.item.image}
              style={styles.image}
            />
          </View>

          {/* Product Name */}
          <Text style={styles.text}>
            {route.params.item.name}
          </Text>

          {/* Price + Share */}
          <View style={styles.priceWrapper}>
            <Text style={styles.text}>
              ${route.params.item.price.toFixed(2)}
            </Text>
            <View style={styles.shareArea}>
              {showShareTooltip && (
                <View style={styles.shareTooltip}>
                  <Text style={styles.shareTooltipText}>
                    Coming Soon...
                  </Text>
                </View>
              )}
              <Pressable
                style={styles.shareIconWrapper}
                onPress={() => {
                  setShowShareTooltip(true);
                  setTimeout(() => setShowShareTooltip(false), 1500);
                }}
                hitSlop={8}
              >
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  style={styles.shareIcon}
                />
              </Pressable>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.starWrapper}>
            <FontAwesome5
              name="star"
              solid
              style={styles.starIcon}
            />
            <FontAwesome5
              name="star"
              solid
              style={styles.starIcon}
            />
            <FontAwesome5
              name="star"
              solid
              style={styles.starIcon}
            />
            <FontAwesome5
              name="star"
              solid
              style={styles.starIcon}
            />
            <FontAwesome5
              name="star"
              style={styles.starIcon}
            />
          </View>

          {/* Availability */}
          <View style={styles.availability}>
            <Text style={styles.availabilityText}>
              Availability:
            </Text>

            <Text style={styles.starIcon}>8</Text>
          </View>

          {/* Color + Quantity */}
          <View style={styles.colorWrapper}>
            <Text style={styles.text}>Color</Text>
            <View style={styles.wrap}>
              {/* Colors */}
              <View style={styles.colorPlatterWrapper}>
                <View style={styles.colorPlatter} />
                <View style={styles.colorPlatter1} />
                <View style={styles.colorPlatter2} />
                <View style={styles.colorPlatter3} />
              </View>

              {/* Quantity */}
              <View style={styles.counterWrapper}>
                <Pressable
                  onPress={dec}
                  style={({ pressed }) => [
                    styles.counterBtn,
                    pressed && styles.counterBtnPressed,
                  ]}
                >
                  <Text style={styles.counterBtnLabel}>
                    −
                  </Text>
                </Pressable>

                <Text style={styles.counterText}>
                  {quantity}
                </Text>

                <Pressable
                  onPress={inc}
                  style={({ pressed }) => [
                    styles.counterBtn,
                    pressed && styles.counterBtnPressed,
                  ]}
                >
                  <Text style={styles.counterBtnLabel}>
                    +
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Buy Now */}
            <View style={styles.buyNowWrapper}>
              {showTooltip && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>
                    Coming Soon...
                  </Text>
                </View>
              )}

              <Pressable
                style={styles.buyNowBtn}
                onPress={handleBuyNow}
              >
                <Text style={styles.buyNowText}>
                  Buy Now
                </Text>
              </Pressable>
            </View>

            {/* Add To Cart */}
            <Pressable
              style={styles.addToCartBtn}
              onPress={onAddToCart}
            >
              <Text style={styles.addToCartText}>
                Add To Cart
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingBottom: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3F4AA8",
    fontFamily: "serif",
  },
  shareIcon: {
    color: "#3F4AA8",
    fontSize: 22,
    fontFamily: "serif",
  },
  barIcon: {
    color: "#3F4AA8",
    fontSize: 22,
    fontFamily: "serif",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  imageWrapper: {
    marginVertical: 20,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shareIconWrapper: {
    padding: 4,
    borderColor: "#3F4AA8",
    borderWidth: 1,
    borderRadius: 50,
  },
  shareArea: {
    position: "relative",
  },
  shareTooltip: {
    position: "absolute",
    top: -46,
    right: 8,
    minWidth: 110,
    alignItems: "flex-end",
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 6,
  },
  shareTooltipText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "serif",
  },

  starWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  starIcon: {
    color: "green",
    fontSize: 18,
    fontFamily: "serif",
  },
  availability: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  availabilityText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#3F4AA8",
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "space-between",
  },
  colorWrapper: {
    paddingVertical: 10,
    marginTop: 10,
  },
  colorPlatterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  colorPlatter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "black",
  },
  colorPlatter1: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "violet",
  },
  colorPlatter2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "red",
  },
  colorPlatter3: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "gray",
  },

  counterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  counterBtnPressed: {
    opacity: 0.65,
  },
  counterBtnLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    fontFamily: "serif",
  },

  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "serif",
  },
  buyNowBtn: {
    marginTop: 20,
    backgroundColor: "green",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    fontFamily: "serif",
  },
  addToCartBtn: {
    marginTop: 20,
    borderColor: "green",
    borderWidth: 1.5,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    fontFamily: "serif",
  },
  buyNowWrapper: {
    position: "relative",
    alignItems: "center",
  },
  tooltip: {
    position: "absolute",
    top: -20,
    backgroundColor: "#333",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "serif",
  },
});