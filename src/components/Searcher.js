import React from 'react';
import { StyleSheet } from 'react-native';
import Input from './Input';
import Icon from 'react-native-vector-icons/FontAwesome';

//Colors
import Colors from '../res/Colors';

const Searcher = (props) => {
    return (
        <Input type="emerald">Buscar...</Input>
    )
}

export default Searcher

const styles = StyleSheet.create({
    searcher: {
        padding: 5,
        backgroundColor: Colors.emerald,
        borderWidth: 1,
        borderColor: Colors.dark,
        borderRadius: 15,
        width: '85%',
        marginTop: 25,
    }
})
