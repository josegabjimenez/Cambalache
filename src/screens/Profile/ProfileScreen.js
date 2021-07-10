import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';

//Firebase
import firebase from '../../database/firebase';

const ProfileScreen = () => {

    const LogOut = async () => {
        try {
            await firebase.auth.signOut();
            //Alert.alert("Has cerrado sesión.")
        } catch (err) {
            Alert.alert("Oops, un error ha ocurrido.\n", err);
        }
    }

    return (
        <View style={styles.container}>
            <Button type="dark" onPress={LogOut}>Cerrar sesión</Button>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
