import React from 'react';
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';

//Colors
import Colors from '../res/Colors';

const CARD_WIDTH = (Dimensions.get('window').width) * 0.40;
const CARD_HEIGHT = (Dimensions.get('window').height) * 0.26;
const IMAGE_HEIGHT = (Dimensions.get('window').height) * 0.15;
const DESCRIPTION_HEIGHT = (CARD_HEIGHT - IMAGE_HEIGHT) * 0.65;

const Card = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: props.img}}

                    />
                </View>

                <View style={styles.titleContainer}>
                    <CustomText type="bold" style={{fontSize: 16}}>{props.title}</CustomText>
                </View>

                <View style={styles.descriptionContainer}>
                    <CustomText type="regular">{props.description}</CustomText>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: Colors.emerald,
        borderWidth: 2,
        borderColor: Colors.dark,
        borderRadius: 17,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    imageContainer: {
        width: '100%',
        height: IMAGE_HEIGHT,
        backgroundColor: Colors.greenDark,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.dark,
    },
    titleContainer: {
        width: '90%',
        height: 18,
        alignSelf: 'center',
        overflow: 'hidden',
        marginTop: 3,
    },
    descriptionContainer: {
        width: '90%',
        height: DESCRIPTION_HEIGHT,
        alignSelf: 'center',
        overflow: 'hidden',
        marginTop: 2,
    }
})
