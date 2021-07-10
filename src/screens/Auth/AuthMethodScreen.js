import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../components/CustomText';

//Colors
import Colors from '../../res/Colors';

const AuthMethodScreen = (props) => {

    const handleNavigation = () => {
        props.navigation.navigate("emailLogIn");
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
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcon name="google" style={styles.iconLink} />
                    <CustomText style={styles.textLink} type="bold">Continuar con Google</CustomText>
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
        //backgroundColor: 'blue',
    },
    logo: {
        fontSize: 60,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
        //backgroundColor: 'red',
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
