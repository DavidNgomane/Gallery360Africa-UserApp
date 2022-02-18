import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { globalStyles } from '../assets/styles/GlobalStyles';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import firestore from '@react-native-firebase/firestore';

const NotificationDetails = ({navigation}) => {

    const cartItem = [
        {
          id: 1,
          name: 'Art Name',
          price: 'R5295.00',
          imgUrl: 'https://miro.medium.com/max/500/1*gbl1Opg1KBeWJpCEqnxOMQ.jpeg',
          address: "10903 Nzima street, Tsakane 1550",
          RecipientName: "David N"
        },
      ];

    const Item = ({ name, imgUrl, price }) => {
        return (
            <View style={{borderRadius: "10", marginTop: 5, marginVertical: 350}} >
                <View style={{width: 37, height: 37, borderRadius: 18.5, backgroundColor: "#FF5353", position: "absolute", zIndex: 10, right: 18, top: 5}}>
                    <TouchableOpacity>
                    <Ionicons name='close-outline' size={25} color="#FFFFFF" style={{textAlign: "center", top: 5, position: "relative"}}/>
                    </TouchableOpacity>
                </View>
                <Image source={{uri: imgUrl}} style={{width: "95%", height: 180, alignSelf: "center", borderRadius: 15}}/>
                <View style={{flexDirection: "column",
                    width: "90%",
                    height: 70,
                    borderRadius: 10,
                    bottom: 75,
                    backgroundColor: 'rgba(16, 18, 27, 0.4)',
                    alignSelf: "center"
                    }}
                    >
                    <Text style={{fontSize: 24, color: "#FFFFFF", fontWeight: "bold", marginHorizontal: 10}}>{name}</Text>
                    <Text style={{fontSize: 18, color: "#FFFFFF", fontWeight: "bold", marginHorizontal: 10}}>{price}</Text>
                <View style={{alignSelf: "flex-end", flexDirection: "row", bottom: 40, justifyContent: "space-around", width: "47%", right: 7}}>
                    <View>
                        <EvilIcons name="plus" size={35} color="#FFFFFF" />
                    </View>
                            <Text style={{color: "#FFFFFF", fontSize: 16, top: 3}}>34</Text>
                    <View>
                        <EvilIcons name="minus" size={35} color="#FFFFFF" />
                    </View>
                </View>
              </View>

              <View style={{borderRadius: 10, width: "90%",  height: "50%", backgroundColor: 'lightgray',  alignSelf: "center",  bottom: 70}}>
                <Text style={{textAlign: "center", marginVertical: 5}}>hello</Text>
              </View>
          </View>
        );
      };

  return (
    <View>
    <ImageBackground
      source={require('../assets/images/home.png')}
      style={globalStyles.container}
      resizeMode='stretch'
    >
        <View style={{flex:1, flexDirection:'row', maxWidth:'80%', justifyContent:'space-around', top:10 }}>
          
          <View style={{height:40, width:40, borderColor:'black', borderWidth:0.5, borderRadius:10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <MaterialIcons
                    name="arrow-back-ios" size={25} 
                    color="black" 
                    style={{top:5, textAlign:'center', left:5}}
                    />
            </TouchableOpacity>
           
          </View>
               <Text style={{fontSize:20, color:'black', top:5, fontWeight: "bold"}}>Payment Notifications</Text>

        </View>

        <View style={{padding: 8 }}>
        <FlatList
          data={cartItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <SafeAreaView>
                <Item name={item.name} imgUrl={item.imgUrl} price={item.price} />
              </SafeAreaView>
            )

          }} />
      </View>

    </ImageBackground>
    </View>
  );
};

export default NotificationDetails;

const styles = StyleSheet.create({});