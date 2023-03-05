// Inspiration: https://dribbble.com/shots/14154226-Rolodex-Scrolling-Animation/attachments/5780833?mode=media
// Photo by Sharefaith from Pexels
// Background image: https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/


import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("screen");
import { faker } from "@faker-js/faker";
import { useEffect, useRef } from "react";

faker.seed(10);

const BG_IMG = "https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
const SPACING = 20;
const AVATAR_SIZE = 50;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default () => {
  const [DATA, setDATA] = React.useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const res = [...Array(30).keys()].map((_, i) => {
      return {
        key: faker.datatype.uuid(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement(["women", "men"])}/60.jpg`,
        name: faker.name.firstName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
      };
    });
    setDATA(res);
  }, []);

  return <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <Image
      source={{ uri: BG_IMG }}
      style={StyleSheet.absoluteFillObject}
      blurRadius={80}
    />
    <Animated.FlatList
      data={DATA}
      keyExtractor={item => item.key}
      contentContainerStyle={{
        padding: SPACING,
        paddingTop: StatusBar.currentHeight || 42,
      }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
      renderItem={({ item, index }) => {
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2),
        ];
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + .5),
        ];

        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0],
        });
        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0],
        });

        return (
          <Animated.View style={{
            flexDirection: "row",
            padding: SPACING,
            marginBottom: SPACING,
            backgroundColor: "rgba(255, 255, 255, .9)",
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            transform: [{ scale }],
            opacity,
          }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                borderRadius: AVATAR_SIZE,
                margin: SPACING / 2,
              }}
            />
            <View>
              <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.name}</Text>
              <Text style={{ fontSize: 18, opacity: 0.7 }}>{item.jobTitle}</Text>
              <Text style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}>{item.email}</Text>
            </View>
          </Animated.View>
        );
      }}
    />
  </View>;
}