import React from "react";
import { StyleSheet, View } from "react-native";
import Piano from "./components/Recorder";

export default function App() {
  return (
    <View style={styles.container}>
      <Piano />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A3D9A5",
  },
});
