import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

//Colors
import Colors from '../res/Colors';

const LoadingScreen = (props) => {

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={Colors.dark} />
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
