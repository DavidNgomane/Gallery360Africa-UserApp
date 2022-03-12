import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';

import Toast from 'react-native-toast-message';

const Cart = ({navigation, route}) => {

  const { uuid } = route.params;

  
  const[cart, setCart] = useState(null)
  const [artName, setArtName] = useState("");
  // const [price, setPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [artURL, setArtURL] = useState(""); 
  const [keyy, setKey] = useState("");
  const [cartItem, setCartItem] = useState(0);


  const[market, setMarket] = useState(null)
  
  const getCart = () => {
    return firestore().collection("cartItem").doc(uuid).onSnapshot((snapShot1) => {
      const getData = snapShot1.ref.collection("items").where("uuid", "==", uuid).onSnapshot((snapShot) => {
      
      const carts = snapShot.docs.map((document) => document.data());
       const prices = snapShot.docs.map((document) => document.data().price);
       const artURLs = snapShot.docs.map((document) => document.data().artUrl);
       const artnames = snapShot.docs.map((document) => document.data().artType);
       const artkeyy= snapShot.docs.map((document) => document.data().keyy);
       const items = snapShot.size;
      //  console.log(artURLs, "this is the one image")
       const initialValue = 0;
       const totalAmounts = prices.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
       setCartItem(items);
       setTotalAmount(totalAmounts);
       setCart(carts);
       setArtName(artnames);
       setArtURL(artURLs);
       setKey(artkeyy);
      })
     })
  }

  const deleteCart = async (keyy) => {

   return await firestore()
      .collection('cartItem')
      .doc(uuid).collection("items").doc(keyy)
      .delete()
      .then(() => {
        Toast.show({
          type: 'error',
          text2: 'Your item has been deleted! ',
       })
      }).catch(error => alert(error))
  }
  useEffect(() => {
    getMarket()
  }, [])

  const Items = ({ name, price, imageUrl }) => {
    return (
      <View style={globalStyles.flatlistView}>
        <View style={globalStyles.cancelIcon}>
          <TouchableOpacity>
            <Ionicons 
              name='close-outline' 
              size={25} 
              color="#FFFFFF" 
              style={globalStyles.closeIconStyle}
            />
          </TouchableOpacity>
        </View>
        <Image 
          source={{uri: imageUrl}} 
          style={globalStyles.cartImage}
        />
        <View style={globalStyles.priceContainer}>
          <Text style={globalStyles.artTxtName}>{name}</Text>
          <Text style={globalStyles.priceTxt}>{price}</Text>

            {/*<View style={{alignSelf: "flex-end", flexDirection: "row", bottom: 40, justifyContent: "space-around", width: "47%", right: 7}}>
              <View>
                <EvilIcons name="plus" size={35} color="#FFFFFF" />
              </View>
                    <Text style={{color: "#FFFFFF", fontSize: 16, top: 3}}>34</Text>
              <View>
                <EvilIcons name="minus" size={35} color="#FFFFFF" />
              </View>
            </View> */}
        </View>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={image} 
      resizeMode="cover" 
      style={globalStyles.container}
    >
      <View style={{flex: 5}}>
        <View style={globalStyles.Top}>
          <View style={globalStyles.backButtonView}>
            <TouchableOpacity 
              onPress={() => navigation.goBack(null)}
              style={globalStyles.backButton}
            >
              <Entypo
                name="chevron-small-left"
                size={40}
                color={"#000"}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={globalStyles.title}>Cart</Text>
          </View>
        </View>

        <FlatList
          data={market}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.ImageUid}`}
          renderItem={({item}) => {
            return (
              <ScrollView>
                <Items imageUrl={item.artUrl} name={item.name} price={item.price}/>
              </ScrollView>
            )
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{borderRadius: 30, width: "95%", height: 180, backgroundColor: "#FFFFFF", alignSelf: "center", marginVertical: -70, borderWidth: 0.4, borderColor: "lightgray"}}>
          <View style={{flexDirection: "row", marginHorizontal: 20, marginVertical: 5}}>
            <View style={{flexDirection: "column", justifyContent: "center",  width: 150, marginVertical: 10}}>
                <Text style={{ fontSize: 16,  color: "gray"}}>Items</Text>
                <Text style={{ fontSize: 16, color: "black"}}>6 Items</Text>
            </View>
            <View style={{flexDirection: "column", justifyContent: "center", width: 140, marginVertical: 10}}>
                <Text style={{ fontSize: 16,  color: "gray"}}>Total Amount</Text>
                <Text style={{ fontSize: 24, color: "black", fontWeight: "bold", right: 25}}>R25 000.00</Text>
            </View>
          </View>
          <View style={{width: "90%", height: 50, borderRadius: 20, backgroundColor: "black", alignSelf: "center", justifyContent: "center", marginTop: 5}}>
            <TouchableOpacity onPress={() => navigation.navigate('DeliveryAddress')}>
              <Text style={{fontSize: 16, color: "#FFFFFF", textAlign: "center"}}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const image = require('../assets/images/home.png');

export default Cart;