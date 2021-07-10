import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert, ActivityIndicator} from 'react-native';
import CustomText from '../../components/CustomText';
import Searcher from '../../components/Searcher';
import Card from '../../components/Card';

//Firebase
import firebase from '../../database/firebase';

//Colors
import Colors from '../../res/Colors';

const HomeScreen = (props) => {

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    //Make a get petition to firestore of all the ads published.
    const getAds = async () => {
        try {
            setLoading(true);
            const res = await firebase.db.collection("ads").get(); //Response of firestore
            const result = res.docs.map(docSnap => docSnap.data()); //Convert all the docs to data
            setAds(result);
            setLoading(false);
            // console.log(result);

        } catch (err) {
            Alert.alert("Oops, algo ha salido mal...\n" + err);
        }
    }

    //Navigates to the detail screen.
    const handleNavigation = (item) => {
        props.navigation.navigate("Detalles", item);
    }

    useEffect(() => {

        props.navigation.addListener("focus", () => getAds());

        return () => {
            navigation.removeListener("focus", () => getAds());
        }

    },[props.navigation]);

    return (
        <View style={styles.container}>
            <Searcher>Buscar...</Searcher>

            <View style={styles.listTitle}>
                <CustomText type="bold" style={{fontSize: 16}}>Productos</CustomText>
            </View>

            <View style={styles.listContainer}>
                { loading && <ActivityIndicator size="large" color={Colors.dark} /> }
                <FlatList 
                    keyExtractor={(item) => item.uid}
                    data={ads}
                    numColumns={2}
                    renderItem={({item}) => (
                        <Card 
                            title={item.title}
                            description={item.description}
                            img={item.img}
                            onPress={() => handleNavigation(item)}
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
    },
})
