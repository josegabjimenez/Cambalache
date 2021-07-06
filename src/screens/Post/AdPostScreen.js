import React, { useState } from 'react';
import { StyleSheet, View, Modal, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import CustomText from '../../components/CustomText';
import Input from '../../components/Input';
import ModalPicker from '../../components/ModalPicker';

import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';

//Colors
import Colors from '../../res/Colors';

const AdPostScreen = () => {

    const [category, setCategory] = useState("Seleccionar...");
    const [isModalActive, setIsModalActive] = useState(false);

    const toggleModal = () => {
        setIsModalActive(!isModalActive);
    }

    const setData = (item) => {
        setCategory(item)
    }

    return (
        <View style={styles.container}>
            <CustomText style={styles.title} type="bold">Publicar artículo</CustomText>

            <View style={styles.fieldsContainer}>
                <Input title="Título" type="emerald">Ingrese el título...</Input>
                <Input title="Descripción" description={true} multiline={true} numerOfLines={4} type="emerald">Ingrese la descripción...</Input>
                <Input title="Número de contacto (+57)" type="emerald">Ingrese su número de teléfono...</Input>

                <View style={styles.pickerGroup}>
                    <View style={styles.pickerTitle}>
                        <CustomText type="bold">Categoría</CustomText>
                    </View>

                    <TouchableOpacity style={styles.picker} onPress={toggleModal}>
                        <View style={styles.row}>
                            <CustomText type="regular">{category}</CustomText> 
                        </View>
                        <View style={styles.row}>
                            <Icon name="downcircle" style={styles.icon}/>
                        </View>
                    </TouchableOpacity>

                    <Modal 
                        animationType="none" 
                        transparent={true}
                        visible={isModalActive}
                        onRequestClose={() => toggleModal}
                    >

                        <ModalPicker 
                            onPress={() => toggleModal()}
                            setData={setData}
                        />

                    </Modal>

                </View>

                <Button style={styles.button} type="light">Subir foto</Button>
                <Button style={styles.button} type="dark">Publicar</Button>

            </View>
        </View>
    )
}

export default AdPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.light,
        alignItems: 'center',
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15,
    },
    fieldsContainer: {
        alignItems: 'center',
        width: '100%'
    },
    pickerGroup: {
        alignItems: 'center',
        width: '100%',
        marginTop: 25,
    },
    pickerTitle: {
        width: '83%',
    },
    row: {
        flexDirection: 'row',
        maxWidth: '90%',
    },  
    picker: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        height: 45,
        borderWidth: 2,
        borderColor: Colors.dark,
        backgroundColor: Colors.emerald,
        borderRadius: 15,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15,
    },
    icon: {
        fontSize: 20,
    },
    button: {
        marginTop: 25,
    }
})
