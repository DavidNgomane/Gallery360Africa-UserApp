import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {GooglePay} from 'react-native-google-pay';
const allowedCardNetworks = ['VISA', 'MASTERCARD'];

const PaymentForm = () => {
  async function Pay() {
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
    const requestData = {
      cardPaymentMethod: {
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          // stripe (see Example):
          gateway: 'stripe',
          gatewayMerchantId: '',
          stripe: {
            publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
            version: '2018-11-08',
          },
          // other:
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },

        allowedCardNetworks,
        allowedCardAuthMethods,
      },
      transaction: {
        totalPrice: '10',
        totalPriceStatus: 'FINAL',
        currencyCode: 'USD',
      },
      merchantName: 'Example Merchant',
    };
    // Set the environment before the payment request
    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      ready => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(requestData)
            .then(token => {
              // Send a token to your payment gateway
            })
            .catch(error => console.log(error.code, error.message));
        }
      },
    );
  }

  return (
    <View style={{height: '100%', width: '100%'}}>
    <View style={styles.btnCon}>
    <TouchableOpacity
      style={styles.btn}
      onPress={Pay}
     >
        <Text style={styles.btnTxt}>Pay with google-pay</Text>
    </TouchableOpacity>
  </View>
  </View>
  );
}

const styles = StyleSheet.create({
  btnCon: {
    top: 90,
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
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
})
export default PaymentForm;