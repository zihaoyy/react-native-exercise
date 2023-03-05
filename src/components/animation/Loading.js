import * as React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";

const LoadingIndicator = ({ size }) => {
  return <MotiView
    from={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 0,
      shadowOpacity: .5,
    }}
    animate={{
      width: size + 20,
      height: size + 20,
      borderRadius: (size + 20) / 2,
      borderWidth: size / 10,
      shadowOpacity: 1,
    }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
    }}
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 5,
      borderColor: "#fff",
      shadowColor: "#fff",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    }}
  />;
};

export default function Loading() {
  return (
    <View style={styles.container}>
      <LoadingIndicator size={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#010100",
  },
});