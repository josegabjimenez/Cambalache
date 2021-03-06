import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert, ActivityIndicator} from 'react-native';
import CustomText from '../../components/CustomText';
import Searcher from '../../components/Searcher';
import Card from '../../components/Card';

//Firebase
import firebase from '../../database/firebase';

//Colors
import Colors from '../../res/Colors';
import CacheImage from '../../components/CacheImage';

const HomeScreen = (props) => {

    const [ads, setAds] = useState([]);
    const [allAds, setAllAds] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [loading, setLoading] = useState(true);

    //Make a get petition to firestore of all the ads published.
    const getAds = async () => {
        try {
            setLoading(true);
            const res = await firebase.db.collection("ads").orderBy("priority", "desc").get(); //Response of firestore
            const result = res.docs.map(docSnap => docSnap.data()); //Convert all the docs to data
            setAds(result);
            setAllAds(result);
            setLoading(false);
            // console.log(result);

        } catch (err) {
            Alert.alert("Oops, algo ha salido mal...\n" + err);
        }
    }

    //Filter the ads list to perform a search 
    const handleQuery = (query) => {
        if(query != ""){
            setIsSearching(true);
            const filteredAds = allAds.filter(ad => {
                return ad.title.toLowerCase().includes(query.toLowerCase()) || 
                ad.category.toLowerCase().includes(query.toLowerCase());
            })
            const compare = (a,b) => {
                if(a.priority < b.priority){
                    return 1;
                } 
                if(a.priority > b.priority) {
                    return -1;
                }
                return 0;
            }            
            setAds(filteredAds.sort(compare));
        } else {
            setIsSearching(false);
            //getAds();
        }


    }

    //Navigates to the detail screen.
    const handleNavigation = (item) => {
        props.navigation.navigate("Detalles", item);
    }

    useEffect(() => {
        
        if(!isSearching){
            props.navigation.addListener("focus", () => getAds());
        }

        return () => {
            props.navigation.removeListener("focus", () => getAds());
        }

    },[props.navigation]);

    useEffect(() => {
        if(!isSearching){
            getAds();
        }
        return () => {
            
        }
    }, [isSearching])


    return (
        <View style={styles.container}>
            <Searcher onChange={handleQuery}>Buscar...</Searcher>

            <View style={styles.listTitle}>
                <CustomText type="bold" style={{fontSize: 16}}>Productos</CustomText>
            </View>

            <View style={styles.listContainer}>
                { loading && ads.length==0 ? <ActivityIndicator size="large" color={Colors.dark} /> : null }
                <FlatList 
                    keyExtractor={(item) => item.imgRef}
                    data={ads}
                    numColumns={2}
                    renderItem={({item}) => (
                        <Card 
                            type="emerald"
                            title={item.title}
                            description={item.description}
                            img={item.img}
                            imgRef={item.imgRef}
                            priority={item.priority}
                            onPress={() => handleNavigation(item)}
                        />
                    )}
                    onRefresh={() => {
                        getAds()
                    }}
                    refreshing={false}
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
    image: {
        width: 300,
        height: 300,
    }
})
