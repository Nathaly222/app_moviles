import React from "react";
import { View, StyleSheet } from "react-native";
import PianoKey from "./PianoKey";

const WHITE_NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
const BLACK_NOTES = ["C#4", "D#4", "", "F#4", "G#4", "A#4", ""]; // Las teclas negras están en los lugares correctos

interface Note {
  note: string;
  type: 'white' | 'black';
  position: number;
}

const notes: Note[] = [
  ...WHITE_NOTES.map((note, index) => ({
    note,
    type: 'white' as 'white', 
    position: index,
  })),
  ...BLACK_NOTES.map((note, index) => (
    note !== '' 
      ? { note, type: 'black' as 'black', position: index } 
      : null
  )).filter(Boolean) as Note[] // Filtrar valores vacíos
];

interface KeyboardProps {
  onKeyPress: (note: string) => void;
}

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  return (
    <View style={styles.keyboard}>
      {notes.map((note) => (
        <PianoKey 
          key={note.note} 
          note={note.note} 
          onPress={() => onKeyPress(note.note)}
          type={note.type}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  keyContainer: {
    position: 'relative',
  },
  blackKeyContainer: {
    position: 'absolute',
    left: 45,
    zIndex: 1,
  },
});
