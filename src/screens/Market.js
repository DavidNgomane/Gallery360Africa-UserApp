import { Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import Carousel from 'react-native-snap-carousel'

const Market = ({navigation}) => {

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 7 / 5);

  // 
  const [artist, setArtist] = useState([]);
  const [artist1, setArtist1] = useState([]);
  
  const getArtist = () => {
    return firestore().collection('artists').onSnapshot((snapShot) => {
      const allArtists = snapShot.docs.map(docSnap => docSnap.data());
      setArtist(allArtists)
    })
  }
  useEffect(() => {
    let isMounted = true;
     getArtist();
    return () => {
      isMounted = false;
    }
  }, [])

  const getArtist1 = () => {
    return firestore().collection('artists').orderBy('artistName').limit(3).onSnapshot((snapShot) => {
      const allArtists1 = snapShot.docs.map(docSnap => docSnap.data());
      setArtist1(allArtists1)
    })
  }
  useEffect(() => {
    let isMounted = true;
     getArtist1();
    return () => {
      isMounted = false;
    }
  }, [])


  //
  const [state, setState] = useState()

  //
  const _renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('ArtPreview', {artistUid: item.artistUid})}>
          <Image
            source={{uri: item.artUrl}}
            style={{width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 16}}
          />
          <View style={{backgroundColor: '#fff', height: 65, position: 'absolute', borderRadius: 16, bottom: 8, left: 8, right: 8, justifyContent: 'center'}}>
            <Text style={globalStyles.artNameTxt}>{item.artName}</Text>
            <Text style={globalStyles.artTypeTxt}>{item.artType}</Text>
          </View>
        
        </TouchableOpacity>
      </View>
    )
  }

  // 
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.homeBody}>
      <SafeAreaView style={{
          width: '100%',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        <Carousel
          data = {artist}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          renderItem= {_renderItem}
          onSnapToItem={(index) => setState({ index })}
          useScrollView={true}
        />
      </SafeAreaView>
  </View>
   <Text style={{color: '#000', paddingLeft: 15, fontSize: 18}}>Artists</Text>
        <View style={globalStyles.homeFooter}>
          
          <ScrollView horizontal={true}>

            <FlatList
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              data={artist1}
              keyExtractor={item => `${item.artistUid}`}
              renderItem={({item}) => {
                return (
                  <View>
                  <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile', { description: item.description, artistUid: item.artistUid, photoUrl: item.photoUrl, artistName: item.artistName})}>
                    <View style={{paddingHorizontal: 5, borderRadius: 10, borderWidth: .5, borderColor: 'gray', margin : 5, justifyContent: "center", alignSelf: "center", width: 102, height: 102}}>
                      <Image 
                        source={{uri: item.photoUrl}} 
                        style={globalStyles.artistImage}
                      />
                       <View style={globalStyles.artistNameContainer}>
                          <Text style={globalStyles.ArtistName} >{item.artistName}</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                  </View>
                );
              }}
            />
              <TouchableOpacity onPress={() => navigation.navigate('Artists')}>
                <View 
                style={{
                  borderWidth: 1,
                  borderColor: '#f5f5f5',
                  borderRadius: 10,
                  paddingHorizontal: 5,  
                  //borderColor: 'gray',
                  margin : 5, 
                  justifyContent: "center", 
                  alignSelf: "center",
                  width: 100,
                  height: 100
                  }}
                  >
                  <Text style={{color: "gray", textAlign: "center", fontSize: 15}}>Show {'\n'}All</Text>
                </View>
              </TouchableOpacity>
              </ScrollView>
        </View>
    </View>
  );
};

export default Market;