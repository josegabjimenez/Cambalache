import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CustomText from '../../components/CustomText';
import Searcher from '../../components/Searcher';
import Card from '../../components/Card';

//Colors
import Colors from '../../res/Colors';

const HomeScreen = () => {

    const products = [
        {
            id: '1',
            title: "Camiseta",
            description: "Camiseta de color negro en buen estadoooooooooooooooooooooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaadfasdfasdfasdfasdfoooooooooo",
            img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Ropa",
            contact: "3176829955",  
        },
        {
            id: '2',
            title: "Iphone 12",
            description: "Camiseta de color negro en buen estado",
            img: "https://images.unsplash.com/photo-1609692814857-d0eaed5a148c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aXBob25lJTIwMTJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Ropa",
            contact: "3176829955",  
        },
        {
            id: '3',
            title: "Moto",
            description: "Camiseta de color negro en buen estado",
            img: "https://images.unsplash.com/photo-1515777315835-281b94c9589f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW90b3JiaWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Ropa",
            contact: "3176829955",  
        },
        
    ];

    return (
        <View style={styles.container}>
            <Searcher>Buscar...</Searcher>

            <View style={styles.listTitle}>
                <CustomText type="bold" style={{fontSize: 16}}>Productos</CustomText>
            </View>

            <View style={styles.listContainer}>
                <FlatList 
                    keyExtractor={(item) => item.id}
                    data={products}
                    numColumns={2}
                    renderItem={({item}) => (
                        <Card 
                            title={item.title}
                            description={item.description}
                            img={item.img}
                        />
                    )}
                /> 
            </View>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    listTitle: {
        width: '83%',
        marginTop: 25,
    },
    listContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        //backgroundColor: 'blue',
    },
})
