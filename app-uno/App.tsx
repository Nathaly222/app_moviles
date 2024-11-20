import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { Image } from 'react-native';

 const PlaceholderImage = require('./assets/logo.png')
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: '#28b09b'}}>Open up App.tsx to start working on your app!</Text>
      <View style={styles.imgContainer}>
      <Image source={PlaceholderImage} style={styles.imgContainer}/>
      </View>
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1a395',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  imgContainer:{
    backgroundColor:'black',
    justifyContent: 'center'
  }
  
});
