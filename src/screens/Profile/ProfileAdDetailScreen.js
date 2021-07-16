import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView, Linking, Platform, Alert } from 'react-native';
import CustomText from '../../components/CustomText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import * as Haptics from 'expo-haptics';

//Firebase
import firebase from '../../database/firebase';

//Colors
import Colors from '../../res/Colors';
import LoadingScreen from '../LoadingScreen';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.31;

const DetailScreen = (item) => {

    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const adsRef = firebase.db.collection('ads');

    //Set to the state all the item params.
    const getData = () => {
        setState(item.route.params);
    }

    //Delete the current ad from the firestore database
    const deleteAd = async () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        Alert.alert("Vas a eliminar tu anuncio", "¿Quieres hacerlo?", [
            {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Eliminar",
                onPress: async () => {
                    try {
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                        setLoading(true);
                        await adsRef.doc(state.docId).delete() // Delete the document
                        item.navigation.goBack();
                        Alert.alert("Tu publicación ha sido eliminada correctamente.")
                    } catch (err) {
                        Alert.alert("Oops, " + err);
                    }
                },
                style: "destructive",
            }
        ])

    }

    useEffect(() => {
        getData();
    }, []);

    console.log(item);

    if (loading){
        return <LoadingScreen />
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.image}
                        source={{uri: state.img}}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.infoContainer}>
                    <CustomText type="bold" style={styles.title}>{state.title}</CustomText>

                    <View style={styles.section}>
                        <CustomText type="bold" style={styles.subTitle}>Descripción: </CustomText>
                        <CustomText type="regular" style={styles.text}>{state.description}</CustomText>
                    </View>

                    <View style={styles.sectionRow}>
                        <CustomText type="bold" style={styles.subTitle}>Categoría: </CustomText>
                        <CustomText type="regular" style={styles.text}>{state.category}</CustomText>
                    </View>

                    <View style={styles.sectionRow}>
                        <CustomText type="bold" style={styles.subTitle}>Contacto: </CustomText>
                        <CustomText type="regular" style={styles.text}>+57 {state.contact} </CustomText>
                        <Icon name="phone" style={{fontSize: 14, alignSelf: 'center'}}/>
                    </View>

                </View>

                <Button type="delete" style={{marginTop: 25, marginBottom: 25,}} onPress={() => deleteAd()} >Eliminar</Button>
            </View>
        </ScrollView>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT * 0.1,
    },
    imageContainer: {
        alignItems: 'center',
        width: '85%'
    },
    image: {
        width: '100%',
        height: IMAGE_HEIGHT,
        borderWidth: 2,
        borderColor: Colors.dark,
        borderRadius: 15,
        marginTop: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    infoContainer: {
        width: '85%',
        alignSelf: 'center',
        marginTop: 25,
    },
    section: {
        marginTop: 25,
    },
    sectionRow: {
        marginTop: 25,
        flexDirection: 'row',
    },
    title: {
        fontSize: 26,
    },
    subTitle: {
        fontSize: 16,
    },
    text: {
        fontSize: 14,
        textAlignVertical: 'center'
    }
})
