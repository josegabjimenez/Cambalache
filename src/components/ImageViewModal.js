import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CacheImage from './CacheImage';

//Colors
import Colors from '../res/Colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ImageViewModal = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isActive}
            onRequestClose={() => props.close()}
        >
            <View style={styles.imageContainer}>
                { props.uri ? (
                    <Image 
                        style={styles.image}
                        source={{uri: props.uri}}
                        resizeMode="cover"
                    />
                ) : (
                    <CacheImage 
                        style={styles.image} 
                        state={props.state} 
                        resizeMode="cover"
                    />
                )}
 
            </View>
            <TouchableOpacity style={styles.backgrond} onPress={() => props.close()}>
                <Icon style={styles.icon} name="close-circle" />
            </TouchableOpacity>
        </Modal>
    )
}

export default ImageViewModal

const styles = StyleSheet.create({
    backgrond: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    icon: {
        fontSize: 40,
        marginTop: SCREEN_HEIGHT * 0.05,
        marginLeft: 5,
        color: Colors.light,
        position: 'absolute',
    },
    imageContainer: {
        height: SCREEN_HEIGHT * 0.5,
        width: SCREEN_WIDTH,
        top: SCREEN_HEIGHT * 0.25,
        position: 'absolute',
        zIndex: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    }
})
