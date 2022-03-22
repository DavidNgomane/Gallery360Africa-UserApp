import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';

const Exhibition = ({navigation, route}) => {

  const [artist, setArtist] = useState(null);

  const getArtist = () => {
    return firestore().collection('artists').onSnapshot((snapShot) => {
      const allArtists = snapShot.docs.map(docSnap => docSnap.data());
      setArtist(allArtists);
    })
  }
  useEffect(() => {
    let isMounted = true;
     getArtist();
    return () => {
      isMounted = false;
    }
  }, [])

  // 
  const [exhibition, setExhibition] = useState(null);
  const getExhibition = () => {
    return firestore().collection('exhibition').onSnapshot((snapShot) => {
      const allExhibitions = snapShot.docs.map(docSnap => docSnap.data());
      setExhibition(allExhibitions);
    })
  }
  useEffect(() => {
    getExhibition();
  }, [])

  // 

  return (
    <View style={globalStyles.container}>
      {/*  */}
      <View style={globalStyles.homeBody}>
        <View style={globalStyles.artContainer}>
          <FlatList
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            data={exhibition}
            keyExtractor={item => `${item.artistUid}`}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('ExhibitionDetails', {artistUid: item.artistUid, })}>
                    <Image 
                      source={{uri: item.exhibitionImage}} 
                      style={globalStyles.artImage}
                    />
                    <View style={globalStyles.artTxtBg}>
                      <Text style={globalStyles.artNameTxt}>Artscapes Exhibition</Text>
                      <View>
                        <Text style={globalStyles.artTypeTxt}>{item.date}</Text>
                        <Text style={globalStyles.artTypeTxt2}>{item.venue}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>

        {/*  */}
        <View style={globalStyles.homeFooter}>
            <FlatList
              horizontal
              // bounces={false}
              showsHorizontalScrollIndicator={false}
              data={artist}
              keyExtractor={item => `${item.artistUid}`}
              renderItem={({item}) => {
                return (
<<<<<<< Updated upstream
                  <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile', { artistDescription: item.description, artistUid: item.artistUid, artistPhoto: item.artistPhoto, artistName: item.artistName})}>
                    <View style={{paddingHorizontal: 10}}>
=======
                  <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile', { description: item.description, artistUid: item.artistUid, artistPhoto: item.photoUrl, artistName: item.artistName, })}>
                    <View style={{paddingHorizontal: 8}}>
>>>>>>> Stashed changes
                      <Image 
                        source={{uri: item.artistPhoto}} 
                        style={globalStyles.artistImage}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
        </View>
    </View>
  );
};

export default Exhibition;
