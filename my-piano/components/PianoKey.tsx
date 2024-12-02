import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Tone from "tone";

interface PianoKeyProps {
  note: string;
}

export default function PianoKey({ note }: PianoKeyProps) {
  const playSound = () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n"); // Genera el sonido de la nota
  };

  return (
    <TouchableOpacity style={styles.key} onPress={playSound}>
      <Text style={styles.text}>{note}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  key: {
    width: 50,
    height: 150,
    margin: 2,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
