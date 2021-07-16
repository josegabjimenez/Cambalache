import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from './CustomText';

//Colors
import Colors from '../res/Colors';

const Button = (props) => {

    const selectVariant = (type) => {
        switch(type){
            case 'dark':
                return {
                    container: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.dark,
                        borderWidth: 2,
                        borderColor: "#000000",
                        borderRadius: 15,
                        width: '85%',
                        height: 45,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 15,
                    },
                    text: {
                        color: Colors.light,
                        fontSize: 15
                    }
                }
            case 'light':
                return {
                    container: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.light,
                        borderWidth: 2,
                        borderColor: "#000000",
                        borderRadius: 15,
                        width: '85%',
                        height: 45,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 15,
                    },
                    text: {
                        color: Colors.dark,
                        fontSize: 15
                    }
                }
            case 'emerald':
                return {
                    container: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.emerald,
                        borderWidth: 2,
                        borderColor: "#000000",
                        borderRadius: 15,
                        width: '85%',
                        height: 45,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 15,
                    },
                    text: {
                        color: Colors.dark,
                        fontSize: 15
                    }
                }
            case 'delete':
                return {
                    container: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.carmin,
                        borderWidth: 2,
                        borderColor: "#000000",
                        borderRadius: 15,
                        width: '85%',
                        height: 45,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 15,
                    },
                    text: {
                        color: Colors.light,
                        fontSize: 15
                    }
                }
            default:
                return {
                    container: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderColor: "#000000",
                        borderRadius: 15,
                        width: '85%',
                        height: 45,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 15,
                    },
                    text: {
                        color: Colors.dark,
                        fontSize: 15
                    }
                }
        }
    }

    const containerStyle = selectVariant(props.type).container;
    const textStyle = selectVariant(props.type).text;

    if(props.disabled){
        return (
            <View style={[styles.disabledContainer, props.style]}>
                <CustomText style={styles.disabledText} type="bold">{props.children}</CustomText>
            </View>
        )
    }

    return (

        <TouchableOpacity style={[containerStyle, props.style]} onPress={props.onPress}>
            <CustomText style={textStyle} type="bold">{props.children}</CustomText>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    disabledContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,1)',
        opacity: 0.5,
        borderWidth: 2,
        borderColor: "#000000",
        borderRadius: 15,
        width: '85%',
        height: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15,
    },
    disabledText: {
        color: Colors.light,
        fontSize: 15
    }
});