import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Dimensions, View, FlatList, ActivityIndicator, Platform } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CustomText from '../../components/CustomText';
import * as Haptics from 'expo-haptics';

//Firebase
import firebase from '../../database/firebase';
//Colors
import Colors from '../../res/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ProfileScreen = (props) => {

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = firebase.auth.currentUser;

    //Make a get petition to firestore of all the ads published.
    const getAds = async () => {
        try {
            setLoading(true);
            const res = await firebase.db.collection("ads").where('uid','==',user.uid).get(); //Response of firestore
            const result = res.docs.map(doc => {
                return Object.assign({docId: doc.id}, doc.data())
            }); //Convert all the docs to data
            setAds(result);
            setLoading(false);

        } catch (err) {
            Alert.alert("Oops, algo ha salido mal...\n" + err);
        }
    }

    const LogOut = async () => {
        try {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            await firebase.auth.signOut();
            //Alert.alert("Has cerrado sesión.")
        } catch (err) {
            Alert.alert("Oops, un error ha ocurrido.\n", err);
        }
    }

    const handleNavigation = (item) => {
        props.navigation.navigate("detail", item);
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => getAds());
        return () => {
            props.navigation.removeListener('focus', () => getAds());
        }
    }, [props.navigation])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileImage}>

                </View>
                <CustomText type="bold" style={styles.username}>{user.email}</CustomText>
                <Button type="dark" style={styles.logOut} onPress={LogOut}>Cerrar sesión</Button>
            </View>
            <View style={styles.section}>
                <View style={styles.ads}>
                    <View style={styles.adsTitleContainer}>
                        <CustomText type="bold" style={styles.adsTitle}>Tus publicaciones</CustomText>
                    </View>
                    <View style={styles.adsList} >
                        <FlatList
                            keyExtractor={(item, index) => (item.imgRef)}
                            data={ads}
                            numColumns={2}
                            renderItem={({item}) => (
                                <Card
                                    type="dark"
                                    title={item.title}
                                    description={item.description}
                                    img={item.img}
                                    onPress={() => handleNavigation(item)}
                                    onDelete={(docId) => deleteAd()}
                                />
                            )}
                            onRefresh={() => {
                                getAds();
                            }}
                            refreshing={loading && ads.length == 0 ? loading : false}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT * 0.07,
    },
    profileImage: {
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_WIDTH * 0.3,
        borderRadius: 100,
        backgroundColor: Colors.dark,
    },
    username: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
    },
    section: {
        width: '100%',
        height: SCREEN_HEIGHT * ( Platform.OS == "ios" ? 0.56 : 0.635),
        paddingLeft: 10,
        paddingTop: 20,
        paddingRight: 10,
    },
    ads: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.emerald,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 2,
        borderColor: Colors.greenDark,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15,
    },
    adsTitleContainer: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    adsTitle: {
        fontSize: 26,
    },
    adsList: {
        maxHeight: '90%',
    },
})
