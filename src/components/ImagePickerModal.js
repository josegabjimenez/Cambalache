import React, { useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import CustomText from './CustomText';
import Button from './Button';
import Icon from 'react-native-vector-icons/Ionicons';

//Colors
import Colors from '../res/Colors';

const HEIGHT_SCREEN = Dimensions.get('window').height;

const ImagePickerModal = (props) => {

    return (
        <View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={props.isActive}
                onRequestClose={() => props.close()}
            >
                <View style={styles.container}>
                    <TouchableOpacity style={styles.icon} onPress={() => props.close()}>
                        <Icon name="close-circle" style={styles.icon}/>
                    </TouchableOpacity>
                    <Button type="dark" style={styles.button} onPress={props.takePhoto}>Tomar foto</Button>
                    <Button type="dark" style={styles.button} onPress={props.pickImage}>Seleccionar de galería</Button>
                    <Button type="dark" style={styles.button} onPress={() => props.close()}>Cancelar</Button>
                </View>
            </Modal>
        </View>

    )
}

export default ImagePickerModal

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: HEIGHT_SCREEN * 0.4,
        marginTop: 200,
        backgroundColor: Colors.emerald,
        borderWidth: 2,
        borderColor: Colors.dark,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
       // padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        fontSize: 25,
        top: 5,
        left: 5,
    },
    button: {
        margin: 10,
    }
})
