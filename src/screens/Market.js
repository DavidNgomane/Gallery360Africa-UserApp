 import { Text, View, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
 import React, { useEffect, useState } from 'react';
//import Exhibition from './Exhibition';
// import { globalStyles } from '../assets/styles/GlobalStyles';
// import firestore from '@react-native-firebase/firestore';



// const Market = ({navigation, route}) => {
  // 
  // const [artist, setArtist] = useState(null);

  // const getArtist = () => {
  //   return firestore().collection('artists').onSnapshot((snapShot) => {
  //     const allArtists = snapShot.docs.map(docSnap => docSnap.data());
  //     setArtist(allArtists);
  //   })
  // }
  // useEffect(() => {
  //   let isMounted = true;
  //    getArtist();
  //   return () => {
  //     isMounted = false;
  //   }
  // }, [])

  // 
//   return (
//     <View style={globalStyles.container}>
//       {/*  */}
//       <View style={globalStyles.homeBody}>
//         <View style={globalStyles.artContainer}>
//           <FlatList
//             horizontal
//             bounces={false}
//             showsHorizontalScrollIndicator={false}
//             pagingEnabled
//             data={artist}
//             keyExtractor={item => `${item.artistUid}`}
//             renderItem={({item}) => {
//               return (
//                 <View>
//                   <TouchableOpacity onPress={() => navigation.navigate('ArtPreview', {artistUid: item.artistUid})}>
//                     <Image 
//                       source={{uri: item.artUrl}} 
//                       style={globalStyles.artImage}
//                     />
//                     <View style={globalStyles.artTxtBg}>
//                       <Text style={globalStyles.artNameTxt}>{item.artName}</Text>
//                       <View>
//                         <Text style={globalStyles.artTypeTxt}>{item.artType}</Text>
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               );
//             }}
//           />
//         </View>
//       </View>

//         {/*  */}
//         <View style={globalStyles.homeFooter}>
//             <FlatList
//               horizontal
//               // bounces={false}
//               showsHorizontalScrollIndicator={false}
//               data={artist}
//               keyExtractor={item => `${item.artistUid}`}
//               renderItem={({item}) => {
//                 return (
//                   <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile', { artistDescription: item.description, artistUid: item.artistUid, artistPhoto: item.artistPhoto, artistName: item.artistName})}>
//                     <View style={{paddingHorizontal: 10}}>
//                       <Image 
//                         source={{uri: item.artistPhoto}} 
//                         style={globalStyles.artistImage}
//                       />
//                     </View>
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//         </View>
//     </View>
//   );
// };

// export default Market;


const listTab = [
  {
    status: 'Market'
  }, 

  {
    status: 'Exhibition'
  }

]




export default function MarketScreen(){
 const [status, setStatus] = useState


 const artData = [

  artistDetails = {
  profileImg: '',
  artistName: 'Sibusiso',
  portraits:[{img1:'', img2:'', img3:'', img4:'',img5:'',}],
   randomArtistImgs:[{ img1:'', img2:'', img3:''}]
  },

exhibtionDetails = {
  Img:'', 
  exhibitName:'Artscapes Exhibition',
  date:'27 Jan',
  venue:'Newtown, Johannesburg',
  randomArt:[{ img1:'', img2:'' ,img3:''}]
}


]


  return(
     <SafeAreaView style={styles.container}>

       

       <View style={styles.listTab}>
         {
           listTab.map(e =>(
            <TouchableOpacity style={styles.btnTab}>
                <Text style={styles.textTab}>{e.status}</Text>
            </TouchableOpacity>
           ))
         }
          

       </View>
       

     </SafeAreaView>
  )
}


const styles = StyleSheet.create({
container:{
  flex:1, 
  paddingHorizontal: 10,
  justifyContent:'center'
},

listTab:{
  flex: 1,
  backgroundColor: '#fff',
  padding: 15,
  flexDirection:'row'
}, 

btnTab:{
  flex: 1,
  flexDirection:'row',
  borderWidth:0.5,
  borderColor: '#EBEBEB',
  padding:10,
  justifyContent: 'center'
}, 
textTab:{
  fontSize: 17
}
})

