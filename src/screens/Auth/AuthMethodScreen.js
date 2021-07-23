import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../components/CustomText';
import * as Google from 'expo-google-app-auth';

//Firebase
import firebase from 'firebase';

//Colors
import Colors from '../../res/Colors';

const AuthMethodScreen = (props) => {

    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    //Navigate to email login method
    const handleNavigation = () => {
        props.navigation.navigate("emailLogIn");
    }

    //Handle google sign in method
    const googleSignIn = async () => {
        //Configuration
        const config = {
            iosClientId: `981453259779-gj8l7pplvka9jsn0fg1qbqgt8ae63428.apps.googleusercontent.com`,
            androidClientId: `981453259779-nc7eqq77b1rlttkqsn1nvpmt5f220553.apps.googleusercontent.com`,
            scopes: ['profile','email'],
        }

        try {
            setGoogleSubmitting(true);
            const result = await Google.logInAsync(config);
            if(result.type == "success"){
                const { idToken, accessToken } = result; //Extracting tokens
                const credential = firebase.auth.GoogleAuthProvider.credential({
                    idToken,
                    accessToken
                });

                await firebase.auth().signInWithCredential(credential); //Succesful sign in with google credentials
                setGoogleSubmitting(false);

            } else {
                Alert.alert('Se ha cancelado el inicio de sesión.')
            }
        } catch (err) {
            Alert.alert('Oops, algo ha salido mal...');
        }
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={[Colors.greenDark, Colors.emerald]}

        >
            <View style={styles.logoContainer}>
                <CustomText style={styles.logo} type="bold">Cambalache</CustomText>
            </View>
            <View style={styles.buttonContainer}> 
                <TouchableOpacity style={styles.button} onPress={!googleSubmitting ? () => googleSignIn() : null}>

                    {googleSubmitting ? <ActivityIndicator size="large" color={Colors.dark}/> : (
                        <>
                            <MaterialCommunityIcon name="google" style={styles.iconLink} />
                            <CustomText style={styles.textLink} type="bold">Continuar con Google</CustomText>
                        </>

                    )}

                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleNavigation}>
                    <MaterialCommunityIcon name="email-outline" style={styles.iconLink} />
                    <CustomText style={styles.textLink} type="bold">Continuar con Email</CustomText>
                </TouchableOpacity>

                <CustomText type="italic" style={styles.textHelp} >Elige un método para iniciar sesión.</CustomText>
            </View>

        </LinearGradient>
    )
}

export default AuthMethodScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.emerald,
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        fontSize: 60,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
    },
    button: {
        flexDirection: 'row',
        width: '85%',
        height: 45,
        backgroundColor: Colors.greenDark,
        borderWidth: 2,
        borderColor: Colors.dark,
        borderRadius: 15,
        padding: 5,
        justifyContent: 'center',
        marginTop: 25,
    },  
    iconLink: {
        fontSize: 30,
    },
    textLink: {
        alignSelf: 'center',
        marginLeft: 10,
        fontSize: 16,
    },
    textHelp: {
        marginTop: 10,
    }
})
