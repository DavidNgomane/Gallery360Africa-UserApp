import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../assets/styles/GlobalStyles';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ShippingAddress = ({navigation}) => {

  const [recipientName, setRecipientName] = useState('');
  const [mobile, setMobile] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

   const register = () => {
    const user = auth()?.currentUser;
    if (recipientName !== "" && mobile !== ""  && streetName !== "" && city !== '' && province !== '' && postalCode !== ''){
      return  firestore().collection('address').add({
            uid: user.uid,
            recipientName: recipientName,
            mobile: mobile,
            streetName: streetName,
            city: city,
            province: province,
            postalCode: postalCode
          }).then((address) => {
            address.update({
              key: address.id
            })
                      alert("Address successfully added");
                      navigation.navigate("DeliveryAddress");
                    }).catch((error) => alert(error));
                  }else{
                    alert("Fill in all required fields");
                  }
  }

  return (
    <ImageBackground
      source={require('../assets/images/home.png')}
      style={globalStyles.container}
      resizeMode='stretch'
    >
        <View style={styles.backButton}>
            <MaterialIcons
                onPress={() => navigation.navigate('DeliveryAddress')}
                style={{alignSelf: 'center', marginVertical: 10, marginLeft: 14}} name="arrow-back-ios" color="#000" size={25}
            />
            <Text style={{color: '#22180E', fontWeight: '600', fontSize: 22, alignSelf: 'center', width: 190, marginLeft: 50}}>Shipping Address</Text>
      </View>
      <View style={styles.body}>
        <TextInput
                style={styles.textField}
                value={recipientName}
                onChangeText={(text) => setRecipientName(text)}
                placeholder="Recipient Name"
                placeholderTextColor="#22180E"
            />
        <TextInput
                style={styles.textField}
                value={mobile}
                onChangeText={(text) => setMobile(text)}
                placeholder="Mobile Number"
                placeholderTextColor="#22180E"
                keyboardType="numeric"
            />
        <TextInput
                style={styles.textField}
                value={streetName}
                onChangeText={(text) => setStreetName(text)}
                placeholder="Street Name"
                placeholderTextColor="#22180E"
            />
        <TextInput
                style={styles.textField}
                value={city}
                onChangeText={(text) => setCity(text)}
                placeholder="City / Town"
                placeholderTextColor="#22180E"
            />
        <TextInput
                style={styles.textField}
                value={province}
                onChangeText={(text) => setProvince(text)}
                placeholder="Pronvince"
                placeholderTextColor="#22180E"
            />
        <TextInput
                style={styles.textField}
                value={postalCode}
                onChangeText={(text) => setPostalCode(text)}
                placeholder="Postal Code"
                placeholderTextColor="#22180E"
                keyboardType="numeric"
            />
      </View>

      <View style={styles.shippingFooter}>
        <TouchableOpacity
            onPress={register}
            style={{backgroundColor:'black', width:'80%', height:50, borderRadius:20, bottom: 15}}>
            <Text style={{color:'white', textAlign:'center', fontSize:14, top:15, }}>Save Address</Text>
          </TouchableOpacity>
      </View>
     
    </ImageBackground>
  );
};

export default ShippingAddress;
const styles = StyleSheet.create({
   textField: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#22180E',
        height: 47,
        width: '80%',
        alignSelf: 'center',
        color: '#000',
        paddingLeft: 15,
        // top: 160
      },
      backButton: {
         flexDirection: 'row',
         marginVertical: 30,
         width: 50,
         height: 50,
         borderRadius: 20,
         borderColor: '#1B1811',
         borderWidth: 1,
         marginHorizontal: 30,
      },
      shippingFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginVertical: 20
    },
    body: {
      flex: 6,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20
  },
    });