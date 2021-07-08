
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import AuthMethodScreen from './src/screens/Auth/AuthMethodScreen';
import LogInScreen from './src/screens/Auth/LogInScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import DetailScreen from './src/screens/Home/DetailScreen';
import AdPostScreen from './src/screens/Post/AdPostScreen';
import LoadingScreen from './src/screens/LoadingScreen';

//Fonts
import * as Font from 'expo-font';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="authMethod" component={AuthMethodScreen} />
      <Stack.Screen name="emailLogIn" component={LogInScreen} /> 
      <Stack.Screen name="emailSignUp" component={SignUpScreen} /> 
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="adPost" component={AdPostScreen} />
    </Tab.Navigator>
  )
}

export default function App() {

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(true);

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
    <NavigationContainer>
      <StatusBar style="auto"/>
      {loading ? (
        <LoadingScreen />
      ) : (
        // <AuthMethodScreen/>
        // <LogInScreen />
        // <SignUpScreen />
        // <AdPostScreen />
        // <HomeScreen />
        // <DetailScreen />

        isAuth ? (<TabNavigator />) : (<AuthNavigator/>)

      )}
        
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
