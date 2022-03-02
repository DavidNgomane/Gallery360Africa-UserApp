import { Text, View, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

const Market = ({navigation, route}) => {
  // 
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

  const signoutUser = async () => {
    try{
        await auth().signOut().then(() => {
          Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: 'You have signed out!',
         })
           navigation.replace("SignIn")
          // navigation.replace("SignIn");
        }).catch((error) => alert(error))
        
    }catch(e){
      console.log(e)
    }
  }

  // 
  return (
    <View style={globalStyles.container}>
      {/*  */}
      <View style={globalStyles.homeBody}>
              <Button
          onPress={signoutUser}
          title="Sign Out"
          color="#841584"
        />
        <View style={globalStyles.artContainer}>
          <FlatList
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            data={artist}
            keyExtractor={item => `${item.artistUid}`}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('ArtPreview', {artistUid: item.artistUid})}>
                    <Image 
                      source={{uri: item.artUrl}} 
                      style={globalStyles.artImage}
                    />
                    <View style={globalStyles.artTxtBg}>
                      <Text style={globalStyles.artNameTxt}>{item.artName}</Text>
                      <View>
                        <Text style={globalStyles.artTypeTxt}>{item.artType}</Text>
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
                  <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile', { artistDescription: item.description, artistUid: item.artistUid, artistPhoto: item.artistPhoto, artistName: item.artistName})}>
                    <View style={{paddingHorizontal: 10}}>
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

export default Market;
