import React from "react";
import { View, StyleSheet } from "react-native";
import PianoKey from './PianoKey';

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
export default function Keyboard() {
    return (
        <View style={styles.keyboard}>
            {notes.map ((note) => (
               <PianoKey key={note} note={note}/> 
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    keyboard: {
        flexDirection: 'row',
        justifyContent: 'center',
    }, 
});