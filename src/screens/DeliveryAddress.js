import React, {useState, useEffect} from "react";
import { View, Text, ImageBackground, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { globalStyles } from "../assets/styles/GlobalStyles";

// const data = [
//     {
//       id:1,
//       address:'123 Main Street',
//       city: 'Johannesburg',
//       location: 'Home'
//     },

//     {
//       id:2,
//       address:'187 Mount Street',
//       city: 'Sandton',
//       location: 'Work'
//     },
  
//     {
//       id:3,
//       address:'995 Jov Street',
//       city: 'Soweto',
//       location: 'Apartment'
//     },
  
//     {
//       id:4,
//       address:'525 Corner Avenue',
//       city: 'Johannesburg',
//       location: 'Studio'
//     },
  
// ];


const Item = ({province, city, streetName}) =>{
     return(
       <View style={{width:'80%', height:69, backgroundColor:'#ebeced', borderRadius:20, alignSelf:'center', marginVertical:5, justifyContent: 'center',}}>
          <Text style={{fontSize:18, left: 20, color:'black', fontWeight: 'bold'}}>{streetName}</Text>
          <Text style={{color:'black', left: 20}}>{province}, {city}</Text>
       </View>
     );
};

const DeliveryAddress = ({navigation}) => {

  const [address, setAddress] = useState([]);
  
  const getAddress = () => {
    return firestore().collection('address').onSnapshot((snapShot) => {
      const allAddress = snapShot.docs.map(docSnap => docSnap.data());
      
      setAddress(allAddress)
    })
  }
  useEffect(() => {
    let isMounted = true;
    getAddress();
    return () => {
      isMounted = false;
    }
  }, [])

    return(
    <View>
      <ImageBackground 
        source={bg} 
        style={{width:'100%', height:'100%'}} 
        resizeMode='stretch'
    >
        <View style={{flex:1, flexDirection:'row', maxWidth:'80%', justifyContent:'space-around', top:20 }}>
          
          <View style={{height:40, width:40, borderColor:'black', borderWidth:1, borderRadius:10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <MaterialIcons
                    name="arrow-back-ios" size={25} 
                    color="black" 
                    style={{top:6, textAlign:'center', left:5}}
                />
            </TouchableOpacity>
           
          </View>
               <Text style={{fontSize:20, color:'black', top:10, }}>Delivery Address</Text>

        </View>
        <SafeAreaView style={{flex:4}}>
          <FlatList 
          data={address}
          keyExtractor={item => `${item.key}`}
          renderItem={({item})=>{
            return(
              <SafeAreaView>
                  <TouchableOpacity  onPress={() => navigation.navigate('PaymentForm')}>
                  <Item province={item.province} streetName={item.streetName} city={item.city} />
                  </TouchableOpacity>
              </SafeAreaView>
            );
          }}/>
        </SafeAreaView>

        <View style={{flex:1, alignSelf:'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShippingAddress')}
            style={{backgroundColor:'black', width:250, height:50, borderRadius:12}}>
            <Text style={{color:'white', textAlign:'center', fontSize:14, top:15, }}>Add New Address</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  )
};

const bg = require('../assets/images/home.png');

export default DeliveryAddress