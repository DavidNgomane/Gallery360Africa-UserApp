import React, { useEffect, useState} from 'react';
import { View, Text, Image} from 'react-native';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Preview = ({route, navigation}) => {

    const { artUrl } = route.params;

  return (
    <View style={{width: '100%', height: '100%'}}>
      
      <Image 
        source={{uri: artUrl}} 
        resizeMode="contain" 
        style={globalStyles.video}
    />
     
    </View>
  )
}


export default Preview;