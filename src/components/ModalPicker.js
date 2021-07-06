import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Dimensions, FlatList } from 'react-native';
import CustomText from './CustomText';

//Colors
import Colors from '../res/Colors';

const ModalPicker = (props) => {

    const categories = [
        "Televisores",
        "Computadores",
        "Carros",
        "Mobiliaria",
        "Televisores",
        "Computadores",
        "Carros",
        "Mobiliaria",
        "Televisores",
        "Computadores",
        "Carros",
        "Mobiliaria",
        "Televisores",
        "Computadores",
        "Carros",
        "Mobiliaria",
        "Televisores",
        "Computadores",
        "Carros",
        "Mobiliaria",
        "Perreo hijueputaaaaaaaaaaaaaaaaaaaaasajoapijsdflakñnfdañsljfhñalskmndfñihgpaoñijoiñejafsiñjdaspoijh"
    ]

    const onPressItem = (item) => {
        props.onPress();
        props.setData(item);
    }

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.modalPicker}>
                <FlatList
                    key={(item) => item} 
                    data={categories}
                    renderItem={({item}) => (
                        <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => onPressItem(item)}>
                            <CustomText style={styles.itemText} type="bold">{item}</CustomText>
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