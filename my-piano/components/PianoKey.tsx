import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";

// Mapeo explícito de las notas a sus archivos de sonido
const soundMapping: { [key: string]: any } = {
  C4: require("../assets/sounds/C4.mp3"),
  D4: require("../assets/sounds/D4.mp3"),
  E4: require("../assets/sounds/E4.mp3"),
  F4: require("../assets/sounds/F4.mp3"),
  G4: require("../assets/sounds/G4.mp3"),
};

interface PianoKeyProps {
  note: string;
}

export default function PianoKey({ note }: PianoKeyProps) {
  const playSound = async () => {
    try {
      // Usar el mapeo para obtener el archivo de sonido correspondiente
      const { sound } = await Audio.Sound.createAsync(soundMapping[note]);

      await sound.playAsync();

      // Liberar recursos después de que el sonido termine
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status && (status as AVPlaybackStatusSuccess).didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
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
