import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
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
  "C4Sharp": require("../assets/sounds/C4Sharp.mp3"),
  "D4Sharp": require("../assets/sounds/D4Sharp.mp3"),
  "F4Sharp": require("../assets/sounds/F4Sharp.mp3"),
  "G4Sharp": require("../assets/sounds/G4Sharp.mp3"),
  "A4Sharp": require("../assets/sounds/A4Sharp.mp3"),
};

const PianoKey: React.FC<PianoKeyProps> = ({ note, onPress, type }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [pressed, setPressed] = useState(false);

  // Cargar sonido solo una vez al montar el componente
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(soundMapping[note]);
        setSound(newSound);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status && (status as AVPlaybackStatusSuccess).didJustFinish) {
            newSound.unloadAsync();
          }
        });
      } catch (error) {
        console.error("Error al cargar el sonido:", error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Limpiar cuando el componente se desmonte
      }
    };
  }, [note]);

  const playSound = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        try {
          await sound.playAsync();
        } catch (error) {
          console.error("Error al reproducir el sonido:", error);
        }
      } else {
        console.warn("El sonido no está completamente cargado.");
      }
    } else {
      console.warn("El sonido no está inicializado.");
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
