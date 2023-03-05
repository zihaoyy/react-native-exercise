import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const Progress = ({ step, steps, height }) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current,
    reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);


  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, steps, width]);

  return (
    <>
      <Text style={{
        fontSize: 12,
        fontWeight: "900",
        marginBottom: 8,
      }}>
        {step}/{steps}
      </Text>
      <View
        onLayout={e => setWidth(e.nativeEvent.layout.width)}
        style={{
          height,
          borderRadius: height,
          backgroundColor: "rgba(0,0,0,.1)",
          overflow: "hidden",
        }}>
        <Animated.View style={{
          width: "100%",
          height,
          borderRadius: height,
          backgroundColor: "rgba(0,0,0,.5)",
          position: "absolute",
          top: 0,
          left: 0,
          transform: [{ translateX: animatedValue }],
        }} />
      </View>
    </>
  );
};

export default function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index => (index + 1) % 10);
    }, 500);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <View style={styles.container}>
      <Progress step={index} steps={10} height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
});