import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { globalStyles } from "../assets/styles/GlobalStyles";
import { create } from "yup/lib/Reference";



export default function ArtistprofileScreen(){
    return(
        <ImageBackground source={require('../src/backgroundImage/home.png')} style={styles.backgroundImg}>
               
        </ImageBackground>
          
       
    )
}


const styles = StyleSheet>create({
mainContainer:{
flex: 1
},

backgroundImg:{
    flex:1,
    width: '100%',
    height:'100%',

}
})