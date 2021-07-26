import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, ScrollView, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import CustomText from '../../components/CustomText';
import Input from '../../components/Input';
import ModalPicker from '../../components/ModalPicker';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import ImagePickerModal from '../../components/ImagePickerModal';
import ImageViewModal from '../../components/ImageViewModal';
import * as ImagePicker from 'expo-image-picker';
import LoadingScreen from '../LoadingScreen';

//Firebase
import firebase from '../../database/firebase';

//Colors
import Colors from '../../res/Colors';

const AdPostScreen = (props) => {

    const [state, setState] = useState({
        title: "",
        description: "",
        img: "",
        imgLocation: "",
        imgRef: "",
        category: "Seleccionar...",
        contact: "",
        priority: "0",
        uid: firebase.auth.currentUser.uid,
    })
    const [isModalActive, setIsModalActive] = useState(false);
    const [isImagePickerActive, setIsImagePickerActive] = useState(false);
    const [isImageViewActive, setIsImageViewActive] = useState(false);
    const [isButtonDisabled, setisButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const resetState = () => {
        setState({
            title: "",
            description: "",
            img: "",
            imgLocation: "",
            imgRef: "",
            category: "Seleccionar...",
            contact: "",
            priority: "0",
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

    const pickImageFromGallery = async () => {
        //Request for permissions and open the library to choose an image
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        //If an image is selected, the image uri is set to the state 
        if(!result.cancelled){
            setState({...state, imgLocation: result.uri});
            setIsImagePickerActive(false);
        }
    }

    const takePhotoFromCamera = async () => {
        //Request for permissions and open the camera to take a photo
        await ImagePicker.requestCameraPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        //If the photo is not cancelled, the photo uri is set to the state
        if(!result.cancelled){
            setIsImagePickerActive(false);
            setState({...state, imgLocation: result.uri});
        }
    }

    const uploadImage = async () => {
        setLoading(true);
        //Upload the image to firebase storage
        const imageName = Date.now();
        const response = await fetch(state.imgLocation);
        const blob = await response.blob();
        const taskUpload = firebase.store.ref().child(`/items/${imageName}.jpg`).put(blob);

        taskUpload.on('state_changed', (snapshot) => {}, (err) => {
            //Handle possible error
            Alert.alert("Oops, algo ha salido mal..." + err);
        }, async () => {
            //Set image download url to the state
            const downloadUrl = await taskUpload.snapshot.ref.getDownloadURL();
            setState({...state, img: downloadUrl, imgRef: imageName});
        });
    }

    const postData = async () => {
        try {
            //Post the current ad state to firebase storage
            // console.log("------------- Se ha posteado esto: ");
            // console.log(state); //DEBUG
            await firebase.db.collection("ads").add(state);
            setLoading(false);
            Alert.alert("Tu anuncio se ha publicado con exito!");
            props.navigation.navigate("Perfil");
        } catch (err) {
            Alert.alert("Oops, algo ha salido mal...\n" + err);
        }
    }

    //This useEffect calls the post data function when the image donwload url is set up to the state
    useEffect(() => {
        if(state.img != ""){
            postData();
        }
    }, [state.img]);

    //This useEffect allow you to know if all the fields were filled or not
    useEffect(() => {
        if(state.title == "" || state.description == "" || state.imgLocation == "" || state.category =="Seleccionar..." || state.contact == ""){
            setisButtonDisabled(true);
        } else {
            setisButtonDisabled(false);
        }
    }, [state]);

    //This useEffects restart all the fields when the focus is no longer on this screen
    useEffect(() => {
        props.navigation.addListener("focus", () => resetState());

        return () => {
            props.navigation.removeListener("focus", () => resetState());
        }
    }, [props.navigation]);

    if(loading){
        return <LoadingScreen />
    }

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
                    { state.imgLocation != "" && 
                        <TouchableOpacity style={styles.imagePreviewContainer} onPress={() => setIsImageViewActive(true)}>
                            <Image style={styles.imagePreview} source={{uri: state.imgLocation}}/> 
                        </TouchableOpacity>
                    }

                    <Button 
                        style={styles.button} 
                        type="light" 
                        onPress={() => setIsImagePickerActive(true)}
                    >
                        Subir foto
                    </Button>
                    <Button 
                        style={styles.button} 
                        type="dark" 
                        onPress={() => uploadImage()} 
                        disabled={isButtonDisabled}
                    >
                        Publicar
                    </Button>

                    {
                    //DEBUG BUTTON
                    /* <Button 
                        style={styles.button} 
                        type="emerald" 
                        onPress={() => console.log(state)} 
                    >
                        Log
                    </Button> */}

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

            <ImagePickerModal 
                isActive={isImagePickerActive} 
                close={() => setIsImagePickerActive(false)} 
                pickImage={pickImageFromGallery}
                takePhoto={takePhotoFromCamera}
            />

            <ImageViewModal 
                isActive={isImageViewActive}
                close={() => setIsImageViewActive(false)}
                uri={state.imgLocation}
            />

        </View>
    )
}

export default AdPostScreen

const styles = StyleSheet.create({
    backgroundImagePicker: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },  
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
    imagePreviewContainer: {
        width: '85%',
        height: Dimensions.get('window').height * 0.3,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colors.dark,
        marginTop: 25,
        marginBottom: 15,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 13,
        borderWidth: 1,
        borderColor: Colors.dark,
        // marginTop: 25,
        // marginBottom: 15,
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
