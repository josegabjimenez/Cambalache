import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from '../../components/CustomText';
import Button from '../../components/Button';
import Input from '../../components/Input';

//Firebase
import firebase from '../../database/firebase';

//Colors
import Colors from '../../res/Colors';

const SignUpScreen = (props) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNavigation = () => {
        props.navigation.goBack();
    }

    const SignUp = async () => {
        if(email == "" || password == ""){
            Alert.alert("Por favor rellene todos los campos.")
        } else {
            try {
                await firebase.auth.createUserWithEmailAndPassword(email,password);
                const user = firebase.auth.currentUser;
                await user.updateProfile({
                    displayName: name,
                })
            } catch (err) {
                console.log(err);
                Alert.alert("Oops, algo ha salido mal...\n" + err);
            }
        }
    }

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, []);

    //DEBUG
    // useEffect(() => {
    //     console.log("Email: " + email);
    //     console.log("Password: " + password);
    // },[email, password]);

    return (

        <LinearGradient
        style={styles.container}
        colors={[Colors.greenDark, Colors.emerald]}

    >
        <View style={styles.logoContainer}>
            <CustomText style={styles.logo} type="bold">Cambalache</CustomText>
        </View>

        <View style={styles.inputContainer}> 

            <Input type="dark" title="Nombre" value={name} onChange={query => setName(query)}>Ingrese su nombre aquí...</Input>
            <Input type="dark" title="Email" value={email} onChange={query => setEmail(query)}>Ingrese su email aquí...</Input>
            <Input type="dark" title="Contraseña" secure={true} value={password} onChange={query => setPassword(query)}>Ingrese su contraseña aquí...</Input>

            <View style={styles.submitSection}>
                <Button type="dark" onPress={SignUp}>Registrarse</Button>
                <TouchableOpacity style={styles.textHelp} onPress={handleNavigation}>
                    <CustomText type="italic" >
                        ¿Ya tienes una cuenta? Inicia sesión
                    </CustomText>
                </TouchableOpacity>
            </View>

                
        </View>

    </LinearGradient>

    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        fontSize: 60,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
    },
    submitSection: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
    },
    textHelp: {
        marginTop: 10,
    }
})
