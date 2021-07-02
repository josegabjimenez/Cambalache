import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import CustomText from './CustomText';

//Colors
import Colors from '../res/Colors';

const Input = (props) => {

    const selectVariant = (type) => {
        switch(type){
            case 'dark':
                return {
                    backgroundColor: Colors.greenDark,
                    color: Colors.light,
                }
            case 'emerald':
                return {
                    backgroundColor: Colors.emerald,
                    color: Colors.dark,
                }
            default: 
                return {
                    backgroundColor: 'transparent',
                    color: Colors.dark,
                }
        }
    }

    const handleText = (query) => {
        if(props.onChange){
            props.onChange(query);
        }
    }

    const inputStyle = selectVariant(props.type);

    return (
        <View style={styles.groupInput}>
            <View style={styles.titleInput}>
                <CustomText type="bold">{props.title}</CustomText>
            </View>

            <TextInput
                style={[styles.textInput, inputStyle]}
                value={props.value}
                onChangeText={handleText}
                placeholder={props.children}
                placeholderTextColor={props.type == "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
                secureTextEntry={props.secure}
            />
        </View>

    )
}

export default Input

const styles = StyleSheet.create({
    groupInput: {
        alignItems: 'center',
        width: '100%',
        marginTop: 25,
    },
    titleInput: {
        width: '83%',
    },
    textInput: {
        width: '85%',
        height: 45,
        borderWidth: 2,
        borderColor: Colors.dark,
        borderRadius: 15,
        justifyContent: 'center',
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
})






