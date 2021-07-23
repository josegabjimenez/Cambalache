import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView, Linking, Platform, TouchableOpacity } from 'react-native';
import CustomText from '../../components/CustomText';
import CacheImage from '../../components/CacheImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import ImageViewModal from '../../components/ImageViewModal';

//Colors
import Colors from '../../res/Colors';

const IMAGE_HEIGHT = (Dimensions.get('window').height) * 0.31;

const DetailScreen = (item) => {

    const [state, setState] = useState({});
    const [isImageViewModalActive, setIsImageViewModalActive] = useState(false);

    //Set to the state all the item params.
    const getData = () => {
        setState(item.route.params);
    }

    const whatsappMessage = () => {
        Linking.openURL('http://api.whatsapp.com/send?phone=57' + state.contact);
    }

    //Open phone to call
    const phoneCall = () => {
        if(Platform.OS == "android"){
            Linking.openURL(`tel:${state.contact}`);
        } else {
            Linking.openURL(`telprompt:${state.contact}`);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const imageState = {
        img: item.route.params.img,
        imgRef: item.route.params.imgRef,
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <TouchableOpacity style={styles.imageContainer} onPress={() => setIsImageViewModalActive(true)}>
                    <CacheImage 
                        style={styles.image}
                        state={imageState}
                        resizeMode="cover"
                    />
                </TouchableOpacity>

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

                <Button type="emerald" social="whatsapp" style={{marginTop: 25}} onPress={whatsappMessage}>Envíar un mensaje</Button>
                <Button type="dark" style={{marginTop: 25, marginBottom: 100}} onPress={phoneCall} >Llamar</Button>

            </View>
            <ImageViewModal state={state} isActive={isImageViewModalActive} close={() => setIsImageViewModalActive(false)}/>
        </ScrollView>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height * 1,
        alignItems: 'center',
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
