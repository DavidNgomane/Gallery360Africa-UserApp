import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from "react-native-safe-area-context";
export default function ArtWorks({route}){
    const [artWork, setArtWork] = useState();
     const { artistUid, photoUrl, artistName, description } = route.params;
  const getArtwork = () => {
    return firestore().collection('Market').where('ArtistUid', '==', artistUid ).onSnapshot((snapShot) => {
      const allArtwork = snapShot.docs.map(docSnap => docSnap.data());
      console.log(allArtwork, 'this is all artwork')
      setArtWork(allArtwork)
    })
  }
  useEffect(() => {
    let isMounted = true;
     getArtwork();
    return () => {
      isMounted = false;
    }
  }, [])
    return(
        <View>
            <ImageBackground resizeMode="cover" style={{width:'100%', height:'100%', }} source={require('../assets/images/home.png')}>
                    <SafeAreaView >
                        <FlatList
                        data={artWork}
                        scrollEnabled
                        keyExtractor={(item, index)=> index.toString()}
                        showsVerticalScrollIndicator
                        renderItem={({item})=>{
                            return(
                            <View
                            style={{flex:5, top:75, height: 325, width:'100%', }}>
                                    <View style={{alignItems:'center'}}>
                                        <Image style={{width:'90%', height:250, borderRadius:15, }} source={{uri: item.artUrl}}/>
                                      <View
                                        style={{backgroundColor: 'rgba(16,18,27,0.4)', height:120, width:'85%', bottom:128, borderRadius:20,}}
                                        blur="51"
                                        transparant={true}>
                                            <View style={{top:15}}>
                                                  <View >
                                                        <Text style={{color:'white', fontSize:17, left:15, fontWeight:'500', }}>{item.artName}</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row', width:"90%", justifyContent:'space-between', alignSelf:'center'}}>
                                                        <Text style={{color:'white'}}>{item.artType}</Text>
                                                        <Text style={{color:'white'}}>{item.artSize}</Text>
                                                    </View>
                                                    <View>
                                                    <Text style={{color:'white', left:15}}>{item.description}</Text>
                                                    </View>
                                            </View>
                                      </View>
                                    </View>
                            </View>
                            )}}
                            />
                    </SafeAreaView>
            </ImageBackground>
        </View>
    )
}