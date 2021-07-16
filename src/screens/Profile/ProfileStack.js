import React from 'react';
import { View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import ProfileAdDetailScreen from './ProfileAdDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';

//Colors
import Colors from '../../res/Colors';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                title: "",
                headerTransparent: true,
                headerBackTitleVisible: false,
                headerTintColor: Colors.dark,
            }}
        >
            <Stack.Screen name="profile" component={ProfileScreen} />
            <Stack.Screen name="detail" component={ProfileAdDetailScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStack

