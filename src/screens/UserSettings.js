import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { globalStyles } from '../assets/styles/GlobalStyles';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import Toast from 'react-native-toast-message';

const UserSettings = ({navigation}) => {

    const signoutUser = async () => {
        try{
            await auth().signOut().then(() => {
              Toast.show({
                type: 'error',
                text1: 'Hello',
                text2: 'You have signed out!',
             })
               navigation.replace("SignIn")
            }).catch((error) => alert(error))
        }catch(e){
          console.log(e)
        }
      }

  return (
    <View>
    <ImageBackground
      source={require('../assets/images/home.png')}
      style={globalStyles.container}
      resizeMode='stretch'
    >
        <SafeAreaView style={{top: 70}}>
            <TouchableOpacity style={{top: 70, alignSelf: 'center', backgroundColor: '#E3E3E3', width: '80%', height:60, justifyContent:'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 20,}}>
                <Text style={{color: '#0E1822', fontSize: 16, fontWeight: '600' }}>Terms and Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{top: 70, alignSelf: 'center', backgroundColor: '#E3E3E3', width: '80%', height:60, justifyContent:'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 20, marginVertical: 10}}>
                <Text style={{color: '#0E1822', fontSize: 16, fontWeight: '600' }}>Payment Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{top: 70, alignSelf: 'center', backgroundColor: '#E3E3E3', width: '80%', height:60, justifyContent:'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 20}}>
                <Text style={{color: '#0E1822', fontSize: 16, fontWeight: '600' }}>Return Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{top: 70, alignSelf: 'center', backgroundColor: '#E3E3E3', width: '80%', height:60, justifyContent:'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 20, marginVertical: 10}}>
                <Text style={{color: '#0E1822', fontSize: 16, fontWeight: '600' }}>About payment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{top: 70, alignSelf: 'center', backgroundColor: '#E3E3E3', width: '80%', height:60, justifyContent:'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 20,}}>
                <Text style={{color: '#0E1822', fontSize: 16, fontWeight: '600' }}>Payment Currency</Text>
                <Text style={{color: 'gray', fontSize: 12}}>ZAR</Text>
            </TouchableOpacity>

            <View style={{top: 70, alignSelf: 'center', backgroundColor: '#E3E3E3', width: '80%', height:60, justifyContent:'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 20, marginVertical: 10}}>
                <Text style={{color: '#0E1822', fontSize: 16, fontWeight: '600' }}>App Version</Text>
                <Text style={{color: 'gray', fontSize: 12,}}>v1.0.0</Text>
            </View>

            <TouchableOpacity 
                style={{top: 70, alignSelf: 'center', backgroundColor: '#E3E3E3', width: '80%', height:60, justifyContent:'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 20, }}
                onPress={signoutUser}
            >
                <Text style={{color: '#0E1822', fontSize: 16, fontWeight: '600' }}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>

    </ImageBackground>
    </View>
  );
};

export default UserSettings;

const styles = StyleSheet.create({});