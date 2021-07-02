import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import LogInScreen from './src/screens/Auth/LogInScreen';
import AuthMethodScreen from './src/screens/Auth/AuthMethodScreen';
import LoadingScreen from './src/screens/LoadingScreen';

//Fonts
import * as Font from 'expo-font';

export default function App() {

  const [loading, setLoading] = useState(true);

  const getFonts = async () => {
      await Font.loadAsync({
          Rambla_Regular: require('./assets/fonts/Rambla-Regular.ttf'),
          Rambla_Bold: require('./assets/fonts/Rambla-Bold.ttf'),
          Rambla_Italic: require('./assets/fonts/Rambla-Italic.ttf'),
          Fuggles: require('./assets/fonts/Fuggles-Regular.ttf'),
      });

      setLoading(false);
  }

  useEffect(() => {
      getFonts();
  },[]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>

      {loading ? (
        <LoadingScreen />
      ) : (
        // <AuthMethodScreen/>
        <LogInScreen />
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
