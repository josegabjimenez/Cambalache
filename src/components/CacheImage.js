import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CacheImage = (props) => {

    const [source, setSource] = useState(null);

    const settingSource = async () => {
        const state = props.state;
        const path = `${FileSystem.cacheDirectory}${state.imgRef}.jpg`; // Path of the image
        const image = await FileSystem.getInfoAsync(path);

        if(image.exists){
            //If the image exist, then is set the uri of the local image in the state
            setSource(image.uri);
            return;
        }

        //Download the image a set up to the cache
        const newImage = await FileSystem.downloadAsync(state.img, path);
        setSource(newImage.uri);
    }

    useEffect(() => {

        settingSource();

    }, []);

    return (
        <Image style={props.style} source={{uri: source}} resizeMode={props.resizeMode}/>
    )
}

export default CacheImage

