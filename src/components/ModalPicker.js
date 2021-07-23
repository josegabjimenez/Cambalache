import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Dimensions, FlatList } from 'react-native';
import CustomText from './CustomText';

//Colors
import Colors from '../res/Colors';

const ModalPicker = (props) => {

    const categories = [
        {category: "Accesorios", key:"1"},
        {category: "Agricultura", key:"2"},
        {category: "Arte", key:"3"},
        {category: "Belleza y cuidado personal", key:"4"},
        {category: "Carros", key:"5"},
        {category: "Motos", key:"6"},
        {category: "Transporte", key:"7"},
        {category: "Celulares", key:"8"},
        {category: "Computación", key:"9"},
        {category: "Videojuegos", key:"10"},
        {category: "Deportes", key:"11"},
        {category: "Electrodomésticos", key:"12"},
        {category: "Herramientas", key:"13"},
        {category: "Hogar y muebles", key:"14"},
        {category: "Música", key:"15"},
        {category: "Libros", key:"16"},
        {category: "Ropa", key:"17"},
        {category: "Otros", key:"18"},



    ]

    const onPressItem = (item) => {
        props.onPress();
        props.setData(item);
    }

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.modalPicker}>
                <FlatList
                    key={(item) => item.key} 
                    data={categories}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.itemContainer} onPress={() => onPressItem(item)}>
                            <CustomText style={styles.itemText} type="bold">{item.category}</CustomText>
                        </TouchableOpacity>
                    )}

                />
            </View>
        </TouchableOpacity>
    )
}

export default ModalPicker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        backgroundColor: 'red',
        flex: 1,
        width: '100%',
    },
    modalPicker: {
        // bottom: 20,
        // right: 20,
        // left: 20,
        // position: 'absolute',
        backgroundColor: Colors.emerald,
        borderWidth: 2,
        borderColor: Colors.dark,
        borderRadius: 15,
        width: '90%',
        maxHeight: (Dimensions.get('window').height / 2),
        padding: 15,
    },
    itemContainer: {
        //backgroundColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        padding: 10
    },
})
