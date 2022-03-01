import React, {useState, useEffect} from "react";
import { View, Text, ImageBackground, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { globalStyles } from "../assets/styles/GlobalStyles";

const Item = ({province, city, streetName}) =>{
     return(
       <View style={{width:'90%', height:69, backgroundColor:'#EBECED', borderRadius:20, alignSelf:'center', marginVertical:5, justifyContent: 'center', }}>
          <Text style={{fontSize:18, left: 20, color:'black', fontWeight: 'bold'}}>{streetName}</Text>
          <Text style={{color:'black', left: 20}}>{province}, {city}</Text>
       </View>
     );
};
const DeliveryAddress = ({navigation, route}) => {

  const { uuid } = route.params;

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
        <View style={{flex:1, flexDirection:'row', maxWidth:'75%', justifyContent:'space-between', top:20, paddingHorizontal:25 }}>
          <View style={{height:40, width:40, borderColor:'black', borderWidth:1, borderRadius:10, justifyContent:'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart', {uuid: uuid})}>
                <MaterialIcons
                    name="arrow-back-ios" size={25}
                    color="black"
                    style={{ alignSelf:'center', left:5 }}
                />
            </TouchableOpacity>
          </View>
               <Text style={{fontSize:20, color:'black', top:10, }}>Delivery Address</Text>
        </View>
        <SafeAreaView style={{flex:4,bottom:35}}>
          <FlatList
          data={address}
          keyExtractor={item => `${item.key}`}
          renderItem={({item})=>{
            return(
              <SafeAreaView>
                  <TouchableOpacity  onPress={() => navigation.navigate('PaymentForm', {uuid: uuid})}>
                  <Item province={item.province} streetName={item.streetName} city={item.city} />
                  </TouchableOpacity>
              </SafeAreaView>
            );
          }}/>
        </SafeAreaView>
        <View style={{flex:1, alignSelf:'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShippingAddress', {uuid: uuid})}
            style={{backgroundColor:'black', width:320, height:45, borderRadius:12, justifyContent:'center', alignItems:'center' }}>
            <Text style={{color:'white', fontSize:14,  }}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
};
const bg = require('../assets/images/home.png');
export default DeliveryAddress;