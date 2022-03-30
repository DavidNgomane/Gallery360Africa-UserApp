import React, { useState } from 'react';
import {
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Image, 
  KeyboardAvoidingView, 
  Modal,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import WebView from 'react-native-webview';

const PaymentForm = ({route, navigation}) => {

  const { uuid } = route.params;


  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');

  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log(order);
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(order));
    return order;
}
function _onError(err) {
    console.log(err);
    let errObj = {
      err: err,
      status: "FAILED",
    };
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
}

function onMessage(e) {
  let data = e.nativeEvent.data;
  setShowGateway(false);
  console.log(data);
}

    // const [name, setName] = useState('');
    // const [cardNumber, setCardNumber] = useState('');
    // const [expiration, setExpiration] = useState('');
    // const [cvv, setCvv] = useState('')

    // const submitForm = () => {
    //   if(name == '' || cardNumber == '' || expiration == '' || cvv == '') {
    //     alert('Fill in all fields')
    //   } else {
    //     navigation.navigate('PaymentSuccesful')

    //     return(
    //       firestore().collection('paymentDetails').add({
    //         name: name,
    //         cardNumber: cardNumber,
    //         expiration: expiration,
    //         cvv: cvv,
    //       })
    //       .catch((error) => {
    //         alert(error);
    //       })
    //     )
    //   }
      
    // }

  return (
    <KeyboardAvoidingView 
        style={globalStyles.cardContainer} // behavior="position"
    >

<SafeAreaView style={{flex: 1}}>
  
      <View style={styles.container}>
        <View style={styles.btnCon}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setShowGateway(true)}>
            <Text style={styles.btnTxt}>Pay Using PayPal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={"fade"}
          transparent>
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                PayPal GateWay
              </Text>
              <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>

            <WebView
              source={{uri: 'https://www.google.com'}}
              onMessage={onMessage}
              style={{flex: 1}}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
            />
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
        {/* <View>
            <View style={styles.backButton}>
            <MaterialIcons 
                onPress={() => navigation.navigate('DeliveryAddress', {uuid: uuid})}
                style={{alignSelf: 'center', marginVertical: 10, marginLeft: 14}} name="arrow-back-ios" color="#000" size={25}
            /> 
            <Text style={{color: '#22180E', fontWeight: '600', fontSize: 22, alignSelf: 'center', width: 190, marginLeft: 50}}>Card Confirmation</Text>
         </View>
        </View> */}

        {/* <View style={globalStyles.body}>
            <Image
                source={require('../assets/images/card.png')}
                style={styles.imageBack}  
            />
            <TextInput
                style={styles.textField}
                value={cardNumber}  
                onChangeText={(text) => setCardNumber(text)}
                placeholder="1234 1234 1234 1234"
                placeholderTextColor="#22180E"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.textField}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="John Doe"
                placeholderTextColor="#22180E"
            />
            <View style={styles.row}>
                <TextInput
                    style={[
                        styles.textField,
                        {
                        marginRight: 20,
                        width: 140,
                        marginHorizontal: 20
                        },
                    ]}
                    value={expiration}
                    onChangeText={(text) => setExpiration(text)}
                    placeholder="MM / YY"
                    placeholderTextColor="#22180E"
                    keyboardType="numeric"
                />
                <TextInput
                    style={[styles.textField,
                        {
                          marginRight: 20,
                          width: 140
                        },
                    ]}
                value={cvv}
                onChangeText={(text) => setCvv(text)}
                placeholder="CVV"
                placeholderTextColor="#22180E"
                keyboardType="numeric"
                />
            </View>
        </View>

        <View style={globalStyles.cardFooter}>
            <View style={{padding: 15, backgroundColor: '#fff', height: 130, width: 300, borderRadius: 30, borderWidth: 1, borderColor: '#e5e5e5',}}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={submitForm}
                >
                    <Text style={styles.buttonTextStyle}>Pay ZAR 350000.00</Text>
                </TouchableOpacity>
            </View>
        </View> */}

    
     
      {/* <View style={styles.topContain}>
         <View style={styles.backButton}>
            <MaterialIcons 
             onPress={() => navigation.navigate('DeliveryAddress')}
            style={{alignSelf: 'center', marginVertical: 10, marginLeft: 14}} name="arrow-back-ios" color="#000" size={25}/> 
            <Text style={{color: '#22180E', fontWeight: '600', fontSize: 22, alignSelf: 'center', width: 190, marginLeft: 50}}>Card Confirmation</Text>
         </View>
         <View >
         <ImageBackground
            source={require('../assets/images/card.png')}
            style={styles.imageBack}>     
        </ImageBackground>
         </View>
      
      <View style={styles.middleContain}>
      <TextInput
        style={styles.textField}
        value={cardNumber}  
        onChangeText={(text) => setCardNumber(text)}
        placeholder="1234 1234 1234 1234"
        placeholderTextColor="#22180E"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textField}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="John Doe"
        placeholderTextColor="#22180E"
      />
      <View style={styles.row}>
        <TextInput
          style={[
            styles.textField,
            {
              marginRight: 20,
              width: 140,
              marginHorizontal: 29
            },
          ]}
          value={expiration}
          onChangeText={(text) => setExpiration(text)}
          placeholder="MM / YY"
          placeholderTextColor="#22180E"
          keyboardType="numeric"
        />
        <TextInput
             style={[
                styles.textField,
                {
                  marginRight: 20,
                  width: 140
                },
              ]}
          value={cvv}
          onChangeText={(text) => setCvv(text)}
          placeholder="CVV"
          placeholderTextColor="#22180E"
          keyboardType="numeric"
        />
      </View>
      </View>
      </View>
      <View style={styles.bottomContain}>
         <View style={styles.payButton}>
         <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}>
            <Text style={styles.buttonTextStyle}>Pay  ZAR 350000.00</Text>
          </TouchableOpacity>
         </View>
      </View> */}
    </KeyboardAvoidingView>
  );
}

export default PaymentForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

      payButton: {
         width: 300,
         height: 145,
         borderRadius: 30,
         borderColor: '#E5E5E5',
         backgroundColor: '#FFFFFF',
         borderWidth: 1,
         alignSelf: 'center',
         marginVertical: 500,
      },

      backButton: {
         flexDirection: 'row',
         marginVertical: 30,
         width: 50,
         height: 50,
         borderRadius: 20,
         borderColor: '#1b1811',
         borderWidth: 1,
         marginHorizontal: 30
      },

      imageBack: {
        height: 190,
        width: 300,
        borderRadius: 16,
        alignSelf: 'center',
        // top: 160
      },

      textField: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#22180E',
        height: 47,
        width: 300,
        alignSelf: 'center',
        color: '#000',
        paddingLeft: 15,
        // top: 160
      },
      row: {
        flexDirection: 'row',
        // top: 30
      },

    buttonStyle: {
      backgroundColor: '#22180E',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 50,
      width: 270,
      alignSelf: 'center',
      borderRadius: 20,
    //   marginLeft: 35,
    //   marginRight: 35,
    //   marginTop: 20,
    //   marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#CEB89E',
      textAlign: 'center',
      marginVertical: 13,
      fontSize: 16,
    },
    inputStyle: {
    //   flex: 1,
      color: 'white',
      height: 50,
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#FFFFFF',
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
    successTextStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      padding: 30,
    },
  
    cardImage: {
        height: 166,
        width: 226,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 30,     
    },




    btnCon: {
      height: 45,
      width: '70%',
      elevation: 1,
      backgroundColor: '#00457C',
      borderRadius: 3,
    },
    btn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnTxt: {
      color: '#fff',
      fontSize: 18,
    },
    webViewCon: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    wbHead: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      zIndex: 25,
      elevation: 2,
    },
  
  });
  