import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { globalStyles } from '../assets/styles/GlobalStyles';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import firestore from '@react-native-firebase/firestore';

const Notifications = ({navigation}) => {

    const data = [
        {
            id:1,
            title: "Payment Success",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            date: "17/06/2022"
        },
    
        {
            id:2,
            title: "Payment Success",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            date: "17/06/2022"
        },
      
    ];
    
    const Item = ({ title, message, date}) =>{
         return(
           <View style={{width:'80%', height:69, backgroundColor:'#ebeced', borderRadius:20, alignSelf:'center', marginVertical:5, justifyContent: 'center',}}>
              <Text style={{fontSize:18, left: 20, color:'black', fontWeight: 'bold'}}>{title}, {date}</Text>
              <Text style={{color:'black', left: 20}}>{message}</Text>
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
               <Text style={{fontSize:20, color:'black', top:5, fontWeight: "bold"}}>Notifications</Text>

        </View>

        <SafeAreaView style={{flex:4}}>
          <FlatList 
          data={data}
          keyExtractor={item=>item.id}
          renderItem={({item})=>{
            return(
              <SafeAreaView>
                  <TouchableOpacity  onPress={() => navigation.navigate('PaymentForm')}>
                  <Item title={item.title} message={item.message} date={item.date}/>
                  </TouchableOpacity>
              </SafeAreaView>
            );
          }}/>
        </SafeAreaView>

    </ImageBackground>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});