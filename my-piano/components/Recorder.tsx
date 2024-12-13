import React, { useState } from "react";
import Keyboard from "./Keyboard";
import { Button, View, StyleSheet } from "react-native";
import { Audio } from "expo-av";


interface NoteRecord {
  note: string;
  time: number;
}

const soundMapping: { [key: string]: any } = {
  C4: require("../assets/sounds/C4.mp3"),
  D4: require("../assets/sounds/D4.mp3"),
  E4: require("../assets/sounds/E4.mp3"),
  F4: require("../assets/sounds/F4.mp3"),
  G4: require("../assets/sounds/G4.mp3"),
  A4: require("../assets/sounds/A4.wav"),
  B4: require("../assets/sounds/B4.wav"),
};

export default function Piano() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<NoteRecord[]>([]);
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);

  const handleKeyPress = (note: string) => {
    const currentTime = Date.now();
    if (isRecording) {
      const time = lastTimestamp ? currentTime - lastTimestamp : 0;
      setRecording((prev) => [...prev, { note, time }]);
      setLastTimestamp(currentTime);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecording([]);
    setLastTimestamp(null);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const playSound = async (note: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundMapping[note]);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) { // Check for playback finish
          sound.unloadAsync();  // Unload the sound after playback is finished
        }
      });
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };
  

  const playRecording = async () => {
    for (const { note, time } of recording) {
      await new Promise((resolve) => setTimeout(resolve, time));
      await playSound(note); // Reproduce el sonido de la nota
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Button
        title="Play Recording"
        onPress={playRecording}
        disabled={recording.length === 0}
      />
      <Keyboard onKeyPress={handleKeyPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
