import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text, ScrollView, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Keyboard from "./Keyboard";  // Este componente maneja las teclas del piano

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
  "C#4": require("../assets/sounds/C#4.mp3"),
  "D#4": require("../assets/sounds/D#4.mp3"),
  "F#4": require("../assets/sounds/F#4.mp3"),
  "G#4": require("../assets/sounds/G#4.mp3"),
  "A#4": require("../assets/sounds/A#4.mp3"),
};

export default function Piano() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<NoteRecord[]>([]);
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [savedRecordings, setSavedRecordings] = useState<NoteRecord[][]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const configureAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });
    };
    configureAudio();
  }, []);

  const handleKeyPress = (note: string) => {
    const currentTime = Date.now();
    if (isRecording && startTimestamp !== null) {
      const time = currentTime - startTimestamp;
      setRecording((prev) => [...prev, { note, time }]);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecording([]);
    setStartTimestamp(Date.now());
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const saveRecording = async () => {
    const updatedRecordings = [...savedRecordings, recording];
    await AsyncStorage.setItem("savedRecordings", JSON.stringify(updatedRecordings));
    setSavedRecordings(updatedRecordings);
  };

  const playSound = async (note: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundMapping[note]);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };

  const playRecording = async (recordingToPlay: NoteRecord[]) => {
    let lastTime = 0;
    for (const { note, time } of recordingToPlay) {
      const delay = time - lastTime;
      await new Promise((resolve) => setTimeout(resolve, delay));
      await playSound(note);
      lastTime = time;
    }
  };

  const handlePlayback = async (index: number) => {
    if (isPlaying) return;
    setIsPlaying(true);
    const selectedRecording = savedRecordings[index];
    await playRecording(selectedRecording);
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Button
        title="Save Recording"
        onPress={saveRecording}
        disabled={recording.length === 0}
      />
      <Button
        title="Play Recording"
        onPress={() => playRecording(recording)}
        disabled={recording.length === 0}
      />
      
      {/* Renderiza el componente Keyboard */}
      <Keyboard onKeyPress={handleKeyPress} />

      <ScrollView>
        <Text style={styles.savedRecordingsTitle}>Saved Recordings:</Text>
        {savedRecordings.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handlePlayback(index)}>
            <View style={styles.recordingItem}>
              <Text>{`Recording ${index + 1}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  savedRecordingsTitle: { fontSize: 18, marginTop: 20 },
  recordingItem: { marginTop: 10, padding: 10, backgroundColor: "#f0f0f0", width: 250, textAlign: "center" },
});
