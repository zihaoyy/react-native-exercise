import React from "react";
import {
  Animated,
  PanResponder,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { WINDOW_HEIGHT } from "../../utils";
import { Colors } from "react-native/Libraries/NewAppScreen";

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * .9;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.6;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const DraggableBottomSheet = () => {
  const animatedValue = new Animated.Value(0);
  let lastGestureDy = 0;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      animatedValue.setOffset(lastGestureDy);
    },
    onPanResponderMove: (e, gesture) => {
      animatedValue.setValue(gesture.dy);
    },
    onPanResponderRelease: (e, gesture) => {
      animatedValue.flattenOffset();
      lastGestureDy += gesture.dy;
      if (lastGestureDy < MAX_UPWARD_TRANSLATE_Y) {
        lastGestureDy = MAX_UPWARD_TRANSLATE_Y;
      } else if (lastGestureDy > MAX_DOWNWARD_TRANSLATE_Y) {
        lastGestureDy = MAX_DOWNWARD_TRANSLATE_Y;
      }

      if (gesture.dy > 0) {
        // dragging down
        if (gesture.dy <= DRAG_THRESHOLD) {
          springAnimation("up");
        } else {
          springAnimation("down");
        }
      } else {
        // dragging up
        if (gesture.dy >= -DRAG_THRESHOLD) {
          springAnimation("down");
        } else {
          springAnimation("up");
        }
      }
    },
  });

  const springAnimation = direction => {
    console.log("direction", direction);
    lastGestureDy =
      direction === "down" ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    flex: 1,
    backgroundColor: true ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Animated.View
        style={[styles.bottomSheet, bottomSheetAnimation]}
        {...panResponder.panHandlers}
      >
        <View style={styles.draggableArea}>
          <View style={styles.dragHandle} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    width: "100%",
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#a8bed2",
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    width: 132,
    height: 32,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
});

export default DraggableBottomSheet;
