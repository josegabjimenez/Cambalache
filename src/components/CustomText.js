import React from 'react'
import { Text } from 'react-native'

const CustomText = (props) => {

    const selectFont = (type) => {
        switch(type){
            case 'bold':
                return 'Rambla_Bold';
            case 'italic':
                return 'Rambla_Italic';
            case 'regular':
                return 'Rambla_Regular';
            default: 
                return 'Rambla_Regular';
        }
    }

    const font = selectFont(props.type?props.type : 'regular'); 
    const style = [{fontFamily: font}, props.style || {}];

    return (
        <Text style={style}>{props.children}</Text>
    )
}

export default CustomText

