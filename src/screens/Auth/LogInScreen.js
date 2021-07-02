import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../components/CustomText';
import Button from '../../components/Button';
import Input from '../../components/Input';

//Colors
import Colors from '../../res/Colors';

const LogInScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, []);

    useEffect(() => {
        console.log("Email: " + email);
        console.log("Password: " + password);
    },[email, password]);


    return (

        <LinearGradient
        style={styles.container}
        colors={[Colors.greenDark, Colors.emerald]}

    >
        <View style={styles.logoContainer}>
            <CustomText style={styles.logo} type="bold">Cambalache</CustomText>
        </View>

        <View style={styles.inputContainer}> 

            <Input type="dark" title="Email" value={email} onChange={query => setEmail(query)}>Ingrese su email aquí...</Input>
            <Input type="dark" title="Contraseña" secure={true} value={password} onChange={query => setPassword(query)}>Ingrese su contraseña aquí...</Input>

            <View style={styles.submitSection}>
                <Button type="dark">Iniciar sesión</Button>
                <TouchableOpacity style={styles.textHelp} >
                    <CustomText type="italic" >
                        ¿No tienes cuenta? Regístrate
                    </CustomText>
                </TouchableOpacity>
            </View>

                
        </View>

    </LinearGradient>

    )
}

export default LogInScreen

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
        //backgroundColor: 'blue',
    },
    logo: {
        fontSize: 60,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
        //backgroundColor: 'red',
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
