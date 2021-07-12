import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import AuthMethodScreen from './src/screens/Auth/AuthMethodScreen';
import LogInScreen from './src/screens/Auth/LogInScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import HomeStack from './src/screens/Home/HomeStack';
import AdPostScreen from './src/screens/Post/AdPostScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import LoadingScreen from './src/screens/LoadingScreen';

//Fonts
import * as Font from 'expo-font';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

//Colors
import Colors from './src/res/Colors';

//Firebase
import firebase from './src/database/firebase';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SCREEN_WIDTH = Dimensions.get('window').width;

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      title: "",
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerTintColor: Colors.dark,
    }}>
      <Stack.Screen name="authMethod" component={AuthMethodScreen} />
      <Stack.Screen name="emailLogIn" component={LogInScreen} /> 
      <Stack.Screen name="emailSignUp" component={SignUpScreen} /> 
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color, padding}) => {
          let iconName;

          if (route.name === "Inicio"){
            iconName = focused ? "home-sharp" : "home-outline"
          } else if (route.name === "Publicar"){
            iconName = focused ? "add-circle-sharp" : "add-circle-outline"
          } else if (route.name === "Perfil"){
            iconName = focused ? "person-sharp" : "person-outline"
          }

          return <Icon name={iconName} size={size} color={color} style={{paddingBottom: padding}} />

        }
      })}
      tabBarOptions={{
        activeTintColor: Colors.dark,
        inactiveTintColor: 'grey',
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        style: {
          backgroundColor: Colors.emerald,
          borderTopWidth: 2,
          borderTopColor: Colors.dark,
          width: SCREEN_WIDTH,
        }
      }}
    >
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Publicar" component={AdPostScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const getFonts = async () => {
      await Font.loadAsync({
          Rambla_Regular: require('./assets/fonts/Rambla-Regular.ttf'),
          Rambla_Bold: require('./assets/fonts/Rambla-Bold.ttf'),
          Rambla_Italic: require('./assets/fonts/Rambla-Italic.ttf'),
          Fuggles: require('./assets/fonts/Fuggles-Regular.ttf'),
      });

      setLoading(false);
  }

  const trackAuthStatus = () => {
    firebase.auth.onAuthStateChanged(user => {
      if(user){
        setIsAuth(true);
        // console.log("User logged in: ", user);
      } else {
        setIsAuth(false);
        // console.log("User logged out.");
      }
    })
  
  }

  useEffect(() => {
      getFonts();
      trackAuthStatus();
  },[]);

  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      {loading ? (
        <LoadingScreen />
      ) : (
        isAuth ? <TabNavigator /> : <AuthNavigator/>
      )}
        
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
