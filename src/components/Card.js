import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import CacheImage from './CacheImage';
import Icon from 'react-native-vector-icons/Ionicons';

//Colors
import Colors from '../res/Colors';

const CARD_WIDTH = (Dimensions.get('window').width) * 0.40;
const CARD_HEIGHT = (Dimensions.get('window').height) * 0.26;
const IMAGE_HEIGHT = (Dimensions.get('window').height) * 0.15;
const DESCRIPTION_HEIGHT = (CARD_HEIGHT - IMAGE_HEIGHT) * 0.65;

const Card = (props) => {

    const selectVariant = () => {
        switch(props.type){
            case 'emerald':
                return [
                    {
                        backgroundColor: Colors.emerald,
                    },
                    {
                        color: Colors.dark,
                    }
                ]
            case 'dark':
                return [
                    {
                        backgroundColor: Colors.dark,
                    },
                    {
                        color: Colors.light,
                    }
                ]
            case 'light':
                return [
                    {
                        backgroundColor: Colors.light,
                    },
                    {
                        color: Colors.dark,
                    }
                ]
            default:
                return [
                    {
                        backgroundColor: Colors.light,
                    },
                    {
                        color: Colors.dark,
                    }
                ]
        }
    }

    const containerStyle = selectVariant()[0];
    const textStyle = selectVariant()[1];

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.container, containerStyle, props.priority > 0 ? styles.prior : null]}>
                <View style={styles.imageContainer}>
                    <CacheImage 
                        style={styles.image}
                        state={{
                            img: props.img,
                            imgRef: props.imgRef
                        }}
                    />
                </View>

                <View style={[styles.titleContainer]}>
                    <CustomText type="bold" style={[{fontSize: 16}, textStyle, props.priority > 0 ? {width: '90%'} : null]}>{props.title}</CustomText>
                    { props.priority > 0 ? <Icon style={{fontSize: 14, color: Colors.carmin}} name="rocket" /> : null }
                    
                </View>

                <View style={styles.descriptionContainer}>
                    <CustomText type="regular" style={textStyle}>{props.description}</CustomText>
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
    prior: {
        borderColor: 'red',
    },
    imageContainer: {
        width: '100%',
        height: IMAGE_HEIGHT,
        backgroundColor: '#E1E5EA',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
