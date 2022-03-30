import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../assets/styles/GlobalStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel'

export default function ArtWorks({route}){

  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
  const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 10 / 5);

  const [artist, setArtist] = useState([]);
  const { artistUid, photoUrl, artistName, description } = route.params;
  
  const getArtist = () => {
    return firestore().collection('Market').where('ArtistUid', '==', artistUid ).onSnapshot((snapShot) => {
      const allArtists = snapShot.docs.map(docSnap => docSnap.data());
      
      setArtist(allArtists)
    })
  }
  useEffect(() => {
    let isMounted = true;
     getArtist();
    return () => {
      isMounted = false;
    }
  }, [])

  const [state, setState] = useState()

  const _renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('ArtistProfile', { description: item.description, artistUid: item.artistUid, photoUrl: item.photoUrl, artistName: item.artistName})}>
          <Image
            source={{uri: item.artUrl}}
            style={{width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 16}}
          />
          <View style={{
            backgroundColor: '#fff', 
            height: 65, 
            position: 'absolute', 
            borderRadius: 16, 
            bottom: 8, left: 8, 
            right: 8, 
            justifyContent: 'center'
            }}
            >
            <Text style={globalStyles.artNameTxt}>{item.artName}</Text>
            <Text style={globalStyles.artTypeTxt}>{item.description}</Text>
          </View>
        
        </TouchableOpacity>
      </View>
    )
  }
 
    return (
      <View  style={globalStyles.container}>

      {/* <View style={styles.searchBarContainer}>
        <Ionicons style={{left:55, top:10}} name="search" size={25} color={'black'} />
                      
          <TextInput
            //onChangeText={}
            placeholder="Search"
            style={styles.searchInput}
          />

          <TouchableOpacity>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
      </View> */}

      <View style={globalStyles.homeBody1}>
        <SafeAreaView style={{
            width: '100%',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <Carousel
            data = {artist}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            renderItem= {_renderItem}
            onSnapToItem={(index) => setState({ index })}
            useScrollView={true}
          />
        </SafeAreaView>
      </View>
 
         

                    {/* <FlatList
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
                            /> */}
                   
           
        </View>
    )
}

const styles = StyleSheet.create({
  searchInput:{
    width: '70%',
    height:50,
    borderColor:'black',
    borderWidth:0.5,
    borderRadius: 7,
    paddingHorizontal: 50, 
    color: 'black',
    //backgroundColor:'#fff'
},
searchBarContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    top: 70
},
searchBtnText:{
    color:'#FF5353',
    top:10,
    fontSize:15
},
})
