import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import CustomText from '../../components/CustomText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';

//Colors
import Colors from '../../res/Colors';

const IMAGE_HEIGHT = (Dimensions.get('window').height) * 0.31;

const DetailScreen = (props) => {

    const product = [
        {
            id: '1',
            title: "Camiseta",
            description: "Camiseta de color negro en buen estadoooooooooooooooooooooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaadfasdfasdfasdfasdfoooooooooo",
            img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Ropa",
            contact: "3176829955",  
        },
    ];


    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    source={{uri: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.infoContainer}>
                <CustomText type="bold" style={styles.title}>Camiseta</CustomText>

                <View style={styles.section}>
                    <CustomText type="bold" style={styles.subTitle}>Descripción: </CustomText>
                    <CustomText type="regular" style={styles.text}>Camiseta de color negro en buen estadoooooooooooooooooooooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaadfasdfasdfasdfasdfoooooooooo</CustomText>
                </View>

                <View style={styles.sectionRow}>
                    <CustomText type="bold" style={styles.subTitle}>Categoría: </CustomText>
                    <CustomText type="regular" style={styles.text}>Televisores</CustomText>
                </View>

                <View style={styles.sectionRow}>
                    <CustomText type="bold" style={styles.subTitle}>Contacto: </CustomText>
                    <CustomText type="regular" style={styles.text}>+57 3176829955 </CustomText>
                    <Icon name="phone" style={{fontSize: 14, alignSelf: 'center'}}/>
                </View>

            </View>


            <Button type="dark" style={{marginTop: 25}}>Llamar</Button>


        </View>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
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
        elevation: 15,
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
