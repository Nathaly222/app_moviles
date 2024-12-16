import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PianoKey from "./PianoKey";

const WHITE_NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
const WHITE_LABELS = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];
const BLACK_NOTES = ["C4Sharp", "D4Sharp", "", "F4Sharp", "G4Sharp", "A4Sharp", ""];
const BLACK_LABELS = ["Do#", "Re#", "", "Fa#", "Sol#", "La#", ""];

interface KeyboardProps {
  onKeyPress: (note: string) => void;
}

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.keyboardContainer}>
        {WHITE_NOTES.map((note, index) => (
          <View key={index} style={styles.noteGroup}>
            <PianoKey note={note} onPress={onKeyPress} type="white" />
            <Text style={styles.whiteLabel}>{WHITE_LABELS[index]}</Text>
            {BLACK_NOTES[index] && (
              <View style={styles.blackKeyWrapper}>
                <PianoKey note={BLACK_NOTES[index]} onPress={onKeyPress} type="black" />
                <Text style={styles.blackLabel}>{BLACK_LABELS[index]}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controlButton}>
          <Text style={styles.controlText}>Start/Stop Recording</Text>
        </View>
        <View style={styles.controlButton}>
          <Text style={styles.controlText}>Save</Text>
        </View>
        <View style={styles.controlButton}>
          <Text style={styles.controlText}>Play</Text>
        </View>
        <View style={styles.controlButton}>
          <Text style={styles.controlText}>Replays</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  keyboardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  noteGroup: {
    position: "relative",
    width: 50,
    alignItems: "center",
  },
  blackKeyWrapper: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    alignItems: "center",
  },
  whiteLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#000",
  },
  blackLabel: {
    position: "absolute",
    top: 40,
    fontSize: 10,
    color: "#fff",
  },
  controlsContainer: {
    justifyContent: "flex-start",
    marginLeft: 20,
  },
  controlButton: {
    padding: 10,
    backgroundColor: "#428bca",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  controlText: {
    color: "white",
    fontSize: 16,
  },
});
