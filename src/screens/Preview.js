import React, { useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Preview = ({route, navigation}) => {

    const { artUrl, artistUid, photoUrl, artistName, artType } = route.params;

  return (
    <View style={{width: '100%', height: '100%'}}>
      
      <Image 
        source={{uri: artUrl}} 
        resizeMode="cover" 
        style={globalStyles.video}
    />

            <View style={globalStyles.bottomContainer1}>
                  <View
                    blur="51"
                    transparant={true}
                    style={globalStyles.secondBottomContainer1}
                  >
                    <View style={globalStyles.viewArtist}>
                    <TouchableOpacity>
                      <Image
                        source={{uri: `${photoUrl}`}} 
                        style={globalStyles.artistImg} 
                      />
                      </TouchableOpacity>
                      <View
                        style={{marginHorizontal: 10, marginVertical: 6, width: '80%'}}
                      >
                          <Text style={globalStyles.artistName}>{artistName}</Text>
                          <Text 
                            style={{fontFamily: 'Poppins', color: '#F5F5F5'}}
                          >
                            {console.log(artType, "the artype is undefined from artpreview")}
                          </Text>
                      </View>
                    </View>
                     
                  </View>
                </View>
            </View>
  )
}


export default Preview;