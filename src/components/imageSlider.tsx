import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const images = [
  require("../assets/backgroundGradient.png"),
  require("../assets/backgroundGradient.png"),
  require("../assets/backgroundGradient.png"),
  require("../assets/backgroundGradient.png"),
  require("../assets/backgroundGradient.png"),
];
const loopedImages = [...images, images[0]];

const AUTOPLAY_MS = 3000;
const SLIDE_IMAGE_HEIGHT = 160;
const SLIDE_HORIZONTAL_INSET = 20;

export default function SliderComponent() {
  const { width: windowWidth } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    timerRef.current = setInterval(() => {
      const next = indexRef.current + 1;
      indexRef.current = next;
      setIndex(next % images.length);
      scrollRef.current?.scrollTo({
        x: next * windowWidth,
        animated: true,
      });
    }, AUTOPLAY_MS);
  }, [clearAutoplay, windowWidth]);

  useEffect(() => {
    startAutoplay();
    return clearAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAutoplay]);

  const onMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / windowWidth);

    // When we hit the cloned last item, jump to real first slide without animation.
    if (i === images.length) {
      indexRef.current = 0;
      setIndex(0);
      scrollRef.current?.scrollTo({ x: 0, animated: false });
      startAutoplay();
      return;
    }

    const clamped = Math.max(0, Math.min(i, images.length - 1));
    indexRef.current = clamped;
    setIndex(clamped);
    startAutoplay();
  };

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(i, images.length - 1));
    indexRef.current = clamped;
    setIndex(clamped);
    scrollRef.current?.scrollTo({
      x: clamped * windowWidth,
      animated: true,
    });
    startAutoplay();
  };

  const imageWidth = windowWidth - SLIDE_HORIZONTAL_INSET * 2;

  return (
    <View style={styles.wrap}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        decelerationRate="fast"
        bounces={false}
      >
        {loopedImages.map((item, i) => (
          <View
            key={i}
            style={[styles.slidePage, { width: windowWidth }]}
          >
            <View style={styles.slideInner}>
              <Image
                source={item}
                style={[
                  styles.image,
                  { width: imageWidth, height: SLIDE_IMAGE_HEIGHT },
                ]}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.text}>
                  New arrivals and fast delivery
                </Text>
                <Text style={styles.subText}>
                  Shop now and enjoy exclusive offers!
                </Text>
                <Text style={styles.subText2}>
                  {"Don't miss out on our latest collection!"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {images.map((_, i) => (
          <Pressable
            key={i}
            onPress={() => goTo(i)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Slide ${i + 1}`}
          >
            <View
              style={[styles.dot, i === index && styles.dotSelected]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 10,
  },
  slidePage: {
    alignItems: "center",
    justifyContent: "center",
  },
  slideInner: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 16,
  },
  overlay: {
    position: "absolute",
    top: 20,
    left: SLIDE_HORIZONTAL_INSET,
    right: SLIDE_HORIZONTAL_INSET,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "serif",
    padding: 4,
  },
  subText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
    fontFamily: "serif",
  },
  subText2: {
    color: "#fff",
    fontSize: 10,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "serif",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    opacity: 0.9,
  },
  dotSelected: {
    opacity: 1,
    backgroundColor: "#3F4AA8",
  },
});
