import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from "react-native-safe-area-context";
// import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';



export default function SearchScreen(){

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
 

const getArtist = () =>{
    return firestore().collection('artists').where('artistUid', '!=', 'artistUid').onSnapshot((snapshot) =>{
     const allArtists = snapshot.docs.map(docSnap => docSnap.data());  
     setData(allArtists)
    })
}

useEffect(()=>{
    getArtist()
}, [])

   

    

   

    const SearchFilterItem = ({artistPhoto, artistName}) =>{ 
                return (
                        <View style={styles.listItems}>
                            <Image source={{uri:artistPhoto}} style={styles.artistImg} />
                            <Text style={{color:'black', fontSize:17}}>{artistName}</Text>
                         </View> 
                )
            }


    const filterSearch = (text) =>{
         data.filter(() =>{
            if(searchTerm == ""){
                return data
            }else if(data.artistName.toLowerCase().includes(searchTerm.toLowerCase())) {
                return  
            }
        })
    }
        

    return(
        
        <View style={styles.parentContainer}>

            <View style={styles.iconContainer}>

                 {/* <MaterialIcons name="arrow-back" size={35} color="black" /> */}

            </View>

            <View style={styles.searchBarContainer}>

                        <TextInput
                        placeholder="Search" 
                        onChangeText={text => filterSearch(text)}
                        style={styles.searchInput}/>
                 
                 

                 <TouchableOpacity>
                     <Text style={styles.searchBtnText}>Search</Text>
                 </TouchableOpacity>

                 
            </View>

            <View style={styles.searchTitleTextContainer}>
                <Text style={styles.recentSearchText}>Recent Search</Text>

                <TouchableOpacity>
                    <Text style={styles.clearAllBtnText}>Clear All</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView>
                <FlatList
                data={data} 
                keyExtractor={(item, uid) => uid.toString()}
                renderItem={({item}) =>{
                    return(
                        <SafeAreaView>
                            <SearchFilterItem artistPhoto={item.artistPhoto} artistName={item.artistName} />
                        </SafeAreaView>
                    )
                }}
                style={{paddingTop: 35}}/>
            </SafeAreaView>

        </View>
    );
};


const styles = StyleSheet.create({

parentContainer:{
    flex:1
},

iconContainer:{
  height: 50,
  width: 50,
  borderRadius: 25,
  backgroundColor: 'lightgray',
  margin: 20,
  justifyContent:'center',
  alignItems: 'center'
},

searchInput:{
    width: '70%',
    height:50,
    borderColor:'black',
    borderWidth:0.5,
    borderRadius: 7,
    left:7

},

searchBarContainer:{
    flexDirection:'row',
    justifyContent:'space-around'
},

searchBtnText:{
    color:'#FF5353',
    top:10,
    fontSize:15
},

recentSearchText:{
    fontWeight:'bold',
    fontSize: 18,
    color:'black'
},

clearAllBtnText:{
    color: 'black',
    fontSize:14,
    top:2
},

searchTitleTextContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center',
    top: 15,
    width:'86%',
    
},

artistImg:{
    width:80,
    height:80,
    borderRadius: 40
},

listItems:{
    flexDirection:'row',
    margin: 13,
    alignItems:'center',
    width: '47%',
    justifyContent:'space-between'

}



});
