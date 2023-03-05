import * as React from "react";
import { Image, View, Dimensions, StyleSheet, Animated, Text } from "react-native";
import { useRef } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const { width, height } = Dimensions.get("screen");

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .75;

const images = [
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128",
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993",
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015",
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369",
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445",
];

const product = {
  title: "SOFT MINI CROSSBODY BAG WITH KISS LOCK",
  description: [
    "Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.",
    "Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7\"",
  ],
  price: "29.99£",
};

const DOT_SIZE = 8,
  DOT_SPACING = 8,
  DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

export default () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return <View style={{ flex: 1 }}>
    <View style={{ height: ITEM_HEIGHT, overflow: "hidden" }}>
      <Animated.FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item }) => {
          return (
            <View>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          );
        }}
      />
      <View style={styles.pagination}>
        {images.map((image, index) => {
          return <View
            key={index}
            style={[styles.dot]}
          />;
        })}
        <Animated.View
          style={[styles.dotIndicator, {
            transform: [{
              translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate({
                inputRange: [0, 1],
                outputRange: [0, DOT_INDICATOR_SIZE],
              }),
            }],
          }]}
        />
      </View>
    </View>
    <BottomSheet
      initialSnapIndex={0}
      snapPoints={[height - ITEM_HEIGHT, height]}
    >
      <BottomSheetScrollView
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={{ fontWeight: '800', fontSize: 16, textTransform: "uppercase" }}>
          {product.title}
        </Text>
        <Text style={{ fontSize: 16 }}>
          {product.price}
        </Text>
        <View style={{ marginVertical: 20 }}>
          {product.description.map((text, index) => (
            <Text key={index} style={{ marginBottom: 10, lineHeight: 22 }}>{text}</Text>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  </View>;
}

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    top: ITEM_HEIGHT / 2 - DOT_SIZE / 2,
    left: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: "#333",
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    borderColor: "#333",
    position: "absolute",
    top: -DOT_SPACING / 2,
    left: -DOT_SPACING / 2,
  },
});