import { ImageBackground, Image, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';

const PaymentSuccesful = () => {
  return (
    <ImageBackground
      source={require('../assets/images/payments/succesful.png')}
      style={globalStyles.container}
      resizeMode='stretch'
    >
      <View style={{flex: 1}}> 
        
      </View>

      <View style={globalStyles.body}>
          <Image
            source={require('../assets/images/payments/right.png')}
            style={globalStyles.wrongLogo}
          />
          <Text style={globalStyles.paymeyntSuccess}>Payment Success</Text>
      </View>
      
      <View style={globalStyles.splashFooter}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/images/payments/image.png')}
            style={{alignSelf: 'center', width: 320, }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        
      </View>
    </ImageBackground>
  );
};

export default PaymentSuccesful;

