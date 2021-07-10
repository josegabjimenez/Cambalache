import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import CustomText from '../../components/CustomText';

//Colors
import Colors from '../../res/Colors';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: 'transparent'
            }
        }}>
            <Stack.Screen name="Inicio" component={HomeScreen} /> 
            <Stack.Screen name="Detalles" component={DetailScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack

