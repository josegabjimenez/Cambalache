import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const LogoImage = (props) => {
    return (
        <View style={styles.container}>
            <Image 
            style={[styles.image, props.style]} 
            source={require("../../assets/logo_large.png")} 
            resizeMode="contain"
            />
        </View>
    )
}

export default LogoImage

const styles = StyleSheet.create({
    container: {
        width: '80%',

    },
    image: {
        width: '100%',
        height: 78
    }
})
