import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Keyboard from "./Keyboard";

// Define the type for recordings
interface NoteRecord {
  note: string;
  time: number;
}

// Sound mapping 
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

export default function Piano() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<NoteRecord[]>([]);
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [savedRecordings, setSavedRecordings] = useState<NoteRecord[][]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundObjects, setSoundObjects] = useState<{ [key: string]: Audio.Sound }>({});

  // Preload sounds when component mounts
  useEffect(() => {
    const loadSounds = async () => {
      try {
        const loadedSounds: { [key: string]: Audio.Sound } = {};
        for (const [note, soundSource] of Object.entries(soundMapping)) {
          const { sound } = await Audio.Sound.createAsync(soundSource);
          loadedSounds[note] = sound;
        }
        setSoundObjects(loadedSounds);
      } catch (error) {
        console.error("Error preloading sounds:", error);
      }
    };

    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });
        
        // Load saved recordings
        const savedData = await AsyncStorage.getItem("savedRecordings");
        if (savedData) {
          setSavedRecordings(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error initializing audio:", error);
      }
    };

    loadSounds();
    configureAudio();

    // Clean up sounds when component unmounts
    return () => {
      Object.values(soundObjects).forEach(sound => sound.unloadAsync());
    };
  }, []);

  const playSound = useCallback(async (note: string) => {
    try {
      const sound = soundObjects[note];
      if (sound) {
        await sound.replayAsync();
      } else {
        console.warn(`No sound found for note: ${note}`);
      }
    } catch (error) {
      console.error(`Error playing sound for ${note}:`, error);
    }
  }, [soundObjects]);

  const handleKeyPress = (note: string) => {
    const currentTime = Date.now();
    if (isRecording && startTimestamp !== null) {
      const time = currentTime - startTimestamp;
      setRecording((prev) => [...prev, { note, time }]);
      playSound(note);
    } else {
      playSound(note);
    }
  };

  const playRecording = async (recordingToPlay: NoteRecord[]) => {
    if (isPlaying || recordingToPlay.length === 0) return;
    
    setIsPlaying(true);
    try {
      let lastTime = 0;
      for (const { note, time } of recordingToPlay) {
        const delay = time - lastTime;
        await new Promise((resolve) => setTimeout(resolve, delay));
        await playSound(note);
        lastTime = time;
      }
    } catch (error) {
      console.error("Playback error:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  const saveRecording = async () => {
    if (recording.length === 0) {
      Alert.alert("No Recording", "There is no recording to save");
      return;
    }

    try {
      const updatedRecordings = [...savedRecordings, recording];
      await AsyncStorage.setItem("savedRecordings", JSON.stringify(updatedRecordings));
      setSavedRecordings(updatedRecordings);
      Alert.alert("Success", "Recording saved successfully");
    } catch (error) {
      console.error("Error saving recording:", error);
      Alert.alert("Save Error", "Could not save the recording");
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
    
    if (isRecording) {
      console.log("Recording saved:", recording);
      if (recording.length > 0) {
        saveRecording();
      }
      setRecording([]);
      setStartTimestamp(null);
    } else {
      // Start recording
      setStartTimestamp(Date.now());
    }
  };

  const handlePlaybackClick = (index: number) => {
    playRecording(savedRecordings[index]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Piano</Text>
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[
            styles.button, 
            { backgroundColor: isRecording ? "#d9534f" : "#5bc0de" }
          ]}
          onPress={toggleRecording}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name={isRecording ? "stop" : "play"} size={20} color="white" />
            <Text style={styles.buttonText}>
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.button, 
            { backgroundColor: "#5cb85c" },
            recording.length === 0 && styles.disabledButton
          ]}
          onPress={saveRecording}
          disabled={recording.length === 0}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="save" size={20} color="white" />
            <Text style={styles.buttonText}>Save Recording</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.button, 
            { backgroundColor: "#428bca" },
            (recording.length === 0 || isPlaying) && styles.disabledButton
          ]}
          onPress={() => playRecording(recording)}
          disabled={recording.length === 0 || isPlaying}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="play-circle" size={20} color="white" />
            <Text style={styles.buttonText}>Play Recording</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={savedRecordings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handlePlaybackClick(index)} style={styles.recordingItem}>
            <Text style={styles.recordingText}>Recording {index + 1}</Text>
          </TouchableOpacity>
        )}
        style={styles.recordingList}
      />
      
      <Keyboard onKeyPress={handleKeyPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
  recordingList: {
    marginTop: 20,
    width: "100%",
  },
  recordingItem: {
    padding: 10,
    backgroundColor: "#e9ecef",
    marginBottom: 5,
    borderRadius: 5,
  },
  recordingText: {
    fontSize: 16,
    color: "#333",
  },
});
