import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";

interface PianoKeyProps {
  note: string;
  onPress: (note: string) => void;
  type: 'white' | 'black';
}

const soundMapping: { [key: string]: any } = {
  C4: require("../assets/sounds/C4.mp3"),
  D4: require("../assets/sounds/D4.mp3"),
  E4: require("../assets/sounds/E4.mp3"),
  F4: require("../assets/sounds/F4.mp3"),
  G4: require("../assets/sounds/G4.mp3"),
  A4: require("../assets/sounds/A4.wav"),
  B4: require("../assets/sounds/B4.wav"),
  "C#4": require("../assets/sounds/C#4.mp3"),
  "D#4": require("../assets/sounds/D#4.mp3"),
  "F#4": require("../assets/sounds/F#4.mp3"),
  "G#4": require("../assets/sounds/G#4.mp3"),
  "A#4": require("../assets/sounds/A#4.mp3"),
};

const PianoKey: React.FC<PianoKeyProps> = ({ note, onPress, type }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [pressed, setPressed] = useState(false);

  const playSound = async () => {
    try {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(soundMapping[note]);
        setSound(newSound);
        await newSound.playAsync();

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status && (status as AVPlaybackStatusSuccess).didJustFinish) {
            newSound.unloadAsync();
          }
        });
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };

  const handlePress = () => {
    setPressed(true);
    playSound();
    onPress(note);
    setTimeout(() => setPressed(false), 150);
  };

  return (
    <TouchableOpacity
      style={[
        styles.key,
        type === 'white' ? styles.whiteKey : styles.blackKey,
        pressed && styles.pressedKey,
      ]}
      onPress={handlePress}
    >
      {type === 'white' && <Text style={styles.text}>{note}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  key: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  whiteKey: {
    width: 50,
    height: 150,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    marginRight: 2,
    zIndex: 0,
  },
  blackKey: {
    position: "absolute",
    width: 30,
    height: 100,
    backgroundColor: "#000",
    marginLeft: -15,
    zIndex: 1,
    top: 0,
    borderRadius: 3,
  },
  pressedKey: {
    backgroundColor: "#aaa",
  },
});
export default PianoKey;