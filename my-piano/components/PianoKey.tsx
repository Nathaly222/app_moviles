import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";

const soundMapping: { [key: string]: any } = {
  C4: require("../assets/sounds/C4.mp3"),
  D4: require("../assets/sounds/D4.mp3"),
  E4: require("../assets/sounds/E4.mp3"),
  F4: require("../assets/sounds/F4.mp3"),
  G4: require("../assets/sounds/G4.mp3"),
  A4: require("../assets/sounds/A4.wav"),
  B4: require("../assets/sounds/B4.wav"),
};

interface PianoKeyProps {
  note: string;
  onPress: (note: string) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, onPress }) => {
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundMapping[note]);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status && (status as AVPlaybackStatusSuccess).didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };

  const handlePress = () => {
    playSound();
    onPress(note);
  };

  return (
    <TouchableOpacity style={styles.key} onPress={handlePress}>
      <Text style={styles.text}>{note}</Text>
    </TouchableOpacity>
  );
};

export default PianoKey;

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
