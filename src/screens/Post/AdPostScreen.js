import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import CustomText from '../../components/CustomText';
import Input from '../../components/Input';
import ModalPicker from '../../components/ModalPicker';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';

//Firebase
import firebase from '../../database/firebase';

//Colors
import Colors from '../../res/Colors';

const AdPostScreen = (props) => {

    const [state, setState] = useState({
        title: "",
        description: "",
        img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Seleccionar...",
        contact: "",
        uid: firebase.auth.currentUser.uid,
    })
    const [isModalActive, setIsModalActive] = useState(false);
    const [isButtonDisabled, setisButtonDisabled] = useState(true);

    const resetState = () => {
        setState({
            title: "",
            description: "",
            img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Seleccionar...",
            contact: "",
            uid: firebase.auth.currentUser.uid,
        });
    }

    const toggleModal = () => {
        setIsModalActive(!isModalActive);
    }

    const setCategoryData = (item) => {
        setState({...state, category: item.category})
    }

    const setData = (field, value) => {
        setState({...state, [field]:value });
    }

    const postData = async () => {

        try {
            await firebase.db.collection("ads").add(state);
            Alert.alert("Tu anuncio se ha publicado con exito!");
            props.navigation.navigate("Perfil");
        } catch (err) {
            Alert.alert("Oops, algo ha salido mal...\n" + err);
        }
        // console.log(state);
    }

    useEffect(() => {
        if(state.title == "" || state.description == "" || state.img == "" || state.category =="Seleccionar..." || state.contact == ""){
            setisButtonDisabled(true);
        } else {
            setisButtonDisabled(false);
        }
    }, [state]);

    useEffect(() => {

        props.navigation.addListener("focus", () => resetState());

        return () => {
            props.navigation.removeListener("focus", () => resetState());
        }

    }, [props.navigation]);

    return (
        <View style={styles.container}>
            <ScrollView>
            <CustomText style={styles.title} type="bold">Publicar artículo</CustomText>

            <View style={styles.fieldsContainer}>
                <Input title="Título" type="emerald" value={state.title} onChange={query => setData("title", query)}>Ingrese el título...</Input>
                <Input 
                    title="Descripción" 
                    description={true} 
                    multiline={true} 
                    numerOfLines={4} 
                    type="emerald" 
                    value={state.description} 
                    onChange={query => setData("description",query)}
                >
                    Ingrese la descripción...
                </Input>
                <Input title="Número de contacto (+57)" type="emerald" value={state.contact} onChange={query => setData("contact",query)}>Ingrese su número de teléfono...</Input>

                <View style={styles.pickerGroup}>
                    <View style={styles.pickerTitle}>
                        <CustomText type="bold">Categoría</CustomText>
                    </View>

                    <TouchableOpacity style={styles.picker} onPress={toggleModal}>
                        <View style={styles.row}>
                            <CustomText style={{height: 18}} type="regular">{state.category}</CustomText> 
                        </View>
                        <View style={styles.row}>
                            <Icon name="downcircle" style={styles.icon}/>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{width: "100%", alignItems: 'center', marginBottom: 25}}>
                    <Button style={styles.button} type="light">Subir foto</Button>
                    <Button style={styles.button} type="dark" onPress={postData} disabled={isButtonDisabled}>Publicar</Button>

                    { isButtonDisabled && <CustomText type="italic" style={styles.disabledText}>Debes llenar todos los campos para poder publicar tu artículo.</CustomText> }
                </View>

            </View>
            </ScrollView>

            <Modal 
                animationType="none" 
                transparent={true}
                visible={isModalActive}
                onRequestClose={() => toggleModal}
            >

                <ModalPicker 
                    onPress={() => toggleModal()}
                    setData={setCategoryData}
                />

            </Modal>

        </View>
    )
}

export default AdPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.light,
    },
    title: {
        marginTop: 50,
        alignSelf: 'center',
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
        overflow: 'hidden',
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
        marginBottom: 15,
    },
    disabledText: {
        width: '85%',
        fontSize: 12,
        textAlign: 'center',
    }
})
