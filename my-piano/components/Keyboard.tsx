import React from "react";
import { View, StyleSheet } from "react-native";
import PianoKey from "./PianoKey";

const WHITE_NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
const BLACK_NOTES = ["C#4", "D#4", "", "F#4", "G#4", "A#4", ""]; // Las teclas negras están en los lugares correctos

interface KeyboardProps {
  onKeyPress: (note: string) => void;
}

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  return (
    <View style={styles.keyboard}>
      {WHITE_NOTES.map((note, index) => (
        <View style={styles.noteGroup} key={index}>
          <PianoKey note={note} onPress={onKeyPress} type="white" />
          {BLACK_NOTES[index] && (
            <PianoKey note={BLACK_NOTES[index]} onPress={onKeyPress} type="black" />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  noteGroup: {
    position: "relative",
    width: 50,
  },
});
