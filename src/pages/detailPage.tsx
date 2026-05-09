import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CartIconWithBadge from "../components/CartIconWithBadge";
import { useCart } from "../context/CartContext";

export default function DetailPage({ route }: any) {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const dec = () => setQuantity((q) => Math.max(1, q - 1));
    const inc = () => setQuantity((q) => Math.min(10, q + 1));
    const onAddToCart = () => {
        addToCart(quantity);
        setQuantity(1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome5 name="bars" style={styles.barIcon} />
                <Text style={styles.text}>Details</Text>
                <CartIconWithBadge />
            </View>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                scrollEnabled={isLandscape}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.imageWrapper}>
                    <Image
                        source={route.params.item.image}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.text}>{route.params.item.name}</Text>
                <View style={styles.priceWrapper}>
                    <Text style={styles.text}>
                        ${route.params.item.price.toFixed(2)}
                    </Text>
                    <View style={styles.shareIconWrapper}>
                     <MaterialCommunityIcons name="share-variant-outline" style={styles.shareIcon} />
                    </View>
                </View>
                <View style={styles.starWrapper}>
                    <FontAwesome5 name="star" solid style={styles.starIcon} />
                    <FontAwesome5 name="star" solid style={styles.starIcon} />
                    <FontAwesome5 name="star" solid style={styles.starIcon} />
                    <FontAwesome5 name="star" solid style={styles.starIcon} />
                    <FontAwesome5 name="star" style={styles.starIcon} />
                </View>
                <View style={styles.availability}>
                    <Text style={styles.availabilityText}>Availability:</Text>
                    <Text style={styles.starIcon}>8</Text>
                </View>
                <View style={styles.colorWrapper}>
                    <Text style={styles.text}>Color</Text>
                    <View style={styles.wrap}>
                        <View style={styles.colorPlatterWrapper}>
                            <View style={styles.colorPlatter} />
                            <View style={styles.colorPlatter1} />
                            <View style={styles.colorPlatter2} />
                            <View style={styles.colorPlatter3} />
                        </View>
                        <View style={styles.counterWrapper}>
                            <Pressable
                                onPress={dec}
                                style={({ pressed }) => [
                                    styles.counterBtn,
                                    pressed && styles.counterBtnPressed,
                                ]}
                            >
                                <Text style={styles.counterBtnLabel}>−</Text>
                            </Pressable>
                            <Text style={styles.counterText}>{quantity}</Text>
                            <Pressable
                                onPress={inc}
                                style={({ pressed }) => [
                                    styles.counterBtn,
                                    pressed && styles.counterBtnPressed,
                                ]}
                            >
                                <Text style={styles.counterBtnLabel}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                    <Pressable style={styles.buyNowBtn}>
                        <Text style={styles.buyNowText}>Buy Now</Text>
                    </Pressable>
                    <Pressable style={styles.addToCartBtn} onPress={onAddToCart}>
                        <Text style={styles.addToCartText}>Add To Cart</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 16,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 24,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        color: '#3F4AA8',
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
});