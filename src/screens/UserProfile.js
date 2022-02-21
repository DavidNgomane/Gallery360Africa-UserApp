import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground, Modal, TextInput, FlatList, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
//
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { globalStyles } from '../assets/styles/GlobalStyles';

const UserProfile = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [ imageUri, setimageUri] = useState(null);
  const [data, setData] = useState(null);

  // image picker
  const openImageLibrary = () => {
    const options ={
      storageOptions:{
        path: 'Images',
        mediaType:'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response =>{
      console.log('Response=', response);
      if(response.didCancel) {
        console.log('Image selection cancelled')
      }else if (response.error) {
        console.log('Error', response.error);
      }else{
        let source = {uri: 'data:image/jpeg;base64,' + response.base64};
        setimageUri(source);
      }
    });
  };

  //
  const getUser = () => {
   const uuid = auth()?.currentUser?.uid;

    return firestore().collection('users').where("uid", "==", uuid).onSnapshot((snapShot) => {
      const query = snapShot.docs.map((documentSnap) => documentSnap.data());
      setData(query);
    })
  }
  useEffect(() => {
    let isMounted = true;
     getUser();
    return () => {
      isMounted = false;
    }
  }, [])

  //
  const ProfileItem = ({ imageURL, name }) =>{
    return(
      <View style={styles.profileImgContainer}>
        <Image source={imageURL} style={styles.profileImg}/>
        <Text style={styles.userNameText}>{name}</Text>
        <TouchableOpacity onPress={() => setModalOpen(true)} style={styles.editBtn}>
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // main
  return (
    <ImageBackground
      source={bg}
      style={globalStyles.container}
      resizeMode='stretch'
    >
      <View>

      </View>
      
      <View style={globalStyles.body}>
        
        {/* <SafeAreaView style={styles.flatlistContainer}> */}
          <FlatList 
            data={data}
            keyExtractor={item=>item.uid}
            renderItem={({item}) =>{
              return(
                <SafeAreaView>
                  <ProfileItem  name={item.name} imageURL={{uri: item.imageURL}} />
                </SafeAreaView>
              );
            }}
            // style={styles.flatlist} 
          />
        {/* </SafeAreaView> */}
      </View>

      <View style={globalStyles.footer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("CartScreen")}
          style={{backgroundColor:"#E3E3E3", width:"80%", height:70, flexDirection:"row", alignSelf:"center", alignItems:"center", borderRadius:20}}
        >
          <MaterialCommunityIcons
            name="cart"
            size={24}
            color={'#0E1822'}
            style={{ marginHorizontal: 20, overflow:"hidden",  color:"#0E1822"}}
          />
            <Text style={{marginHorizontal:10,  color:"#0E1822", fontSize: 16}}> My Cart</Text>
            <Entypo name="chevron-small-right" size={24} style={{marginVertical:-10, marginHorizontal:"40%",  color:"#0E1822"}}/>
        </TouchableOpacity>
                                      
        <TouchableOpacity style={{backgroundColor:"#E3E3E3", width:"80%", height:70, flexDirection:"row", alignSelf:"center", alignItems:"center", borderRadius:20, marginVertical:15}}>
          <MaterialIcons
            name="notifications"
            size={24}
            color={'#0E1822'}
            style={{ marginHorizontal: 20, overflow:"hidden",  color:"#0E1822"}}
          />
                                
          <Text style={{marginHorizontal:0, color:"#0E1822", fontSize: 16}}> Notifications</Text>
          <Entypo name="chevron-small-right" size={24} style={{marginVertical:-10, marginHorizontal:"37%", color:"#0E1822"}}/>
        </TouchableOpacity>
                                      
        <TouchableOpacity style={{backgroundColor:"#E3E3E3", width:"80%", height:70, flexDirection:"row", alignSelf:"center", alignItems:"center", borderRadius:20}}>
          <Ionicons
            name="settings-sharp"
            size={24}
            color={'#0E1822'}
            style={{ marginHorizontal: 20, overflow:"hidden",  color:"#0E1822"}}
          />
                                
          <Text style={{marginHorizontal:10, color:"#0E1822", fontSize: 16}}> Settings</Text>
          <Entypo name="chevron-small-right" size={24} style={{marginVertical:-10, marginHorizontal:"40%",  color:"#0E1822"}}/>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const bg = require('../assets/images/home.png');

export default UserProfile;

const styles = StyleSheet.create({});


// import React, {useEffect, useState} from 'react';
// import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground, Modal, TextInput, FlatList, SafeAreaView } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Entypo from "react-native-vector-icons/Entypo";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { launchImageLibrary } from 'react-native-image-picker';
// ​
// ​
// ​
// //const profileImage = require("../assets/images/artistProfile.jpg");
// const profileImage = require('./src/assets/images/profile.jpg')
// const background = require("./src/assets/images/home.png")
// ​
// export default function UserProfileScreen() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [ imageUri, setimageUri] = useState(null);
//   const [data, setData] = useState(null);
// ​

  
  
// 
// ​
  
 
// }
// ​
// useEffect(() =>{
//   userProfileDetails();
// }, []);
  
// ​
// ​
// ​
//     
// ​
//     return(
//           <View>
//               <ImageBackground source={background} style={styles.backgroundImg}>
// ​
//                 <Modal visible={modalOpen}>
//                      <View style={styles.modalContainer}>
//                        <View style={styles.closeBtnContaainer}>
//                          <EvilIcons onPress={()=> setModalOpen(false) } name='close' size={35} color="white" />
//                        </View>
//                        <View style={styles.editprofileImgContainer}>
//                             <Image source={imageUri} style={styles.uploadedImage} />
//                             <AntDesign onPress={() => openImageLibrary()} style={styles.imgAddIcon} name="pluscircle" size={35} color="#E3E3E3" />
//                        </View>
// ​
//                        <TextInput
//                           placeholder='Edit Username'
//                           style={styles.editUserInput} />
// ​
//                        <TouchableOpacity  style={styles.updateBtn}>
//                          <Text style={styles.modalText}>Update</Text>
//                        </TouchableOpacity>
// ​
                          
// ​
                      
                      
//                      </View>
//                 </Modal>
// ​
            
//                   <TouchableOpacity style={styles.topLeftIcon}>
//                           <Entypo
//                             // onPress={() =>navigation.navigate("HomeScreen")}
//                             name="chevron-thin-left"
//                             size={22}
//                             color={'#0E1822'}
//                             style={{alignSelf: 'center', marginVertical: 10}}
//                           />
//                 </TouchableOpacity>
// ​
// {/*                
//                     <View style={styles.profileImgContainer}>
//                          <Image source={profileImage} style={styles.profileImg}/>
//                            <Text style={styles.userNameText}>Sibusiso</Text>
// ​
//                            <TouchableOpacity onPress={() => setModalOpen(true)} style={styles.editBtn}>
//                              <Text style={styles.btnText}>Edit Profile</Text>
//                            </TouchableOpacity>
//                     </View> */}
//                     <SafeAreaView style={styles.flatlistContainer}>
// ​
//                         <FlatList 
//                         data={data}
//                         keyExtractor={item=>item.uid}
//                         renderItem={({item}) =>{
//                           return(
//                             <SafeAreaView>
//                               <ProfileItem  name={item.name} imageURL={{uri: item.imageURL}} />
//                             </SafeAreaView>
//                           );
//                         }}
                        
//                        style={styles.flatlist} 
                       
//                        />
// ​
//                     </SafeAreaView>
// ​
//                     <View style={styles.optionsContainer}>
//                                             <TouchableOpacity 
//                                             onPress={() => navigation.navigate("CartScreen")}
//                                             style={{backgroundColor:"#E3E3E3", width:"80%", height:70, flexDirection:"row", alignSelf:"center", alignItems:"center", borderRadius:20}}>
//                                     <MaterialCommunityIcons
//                                                 name="cart"
//                                                 size={24}
//                                                 color={'#0E1822'}
//                                                 style={{ marginHorizontal: 10, overflow:"hidden",  color:"#0E1822"}}
//                                       />
                                
//                                       <Text style={{marginHorizontal:10,  color:"#0E1822"}}> My Cart</Text>
//                                       <Entypo name="chevron-small-right" size={24} style={{marginVertical:-10, marginHorizontal:"47%",  color:"#0E1822"}}/>
//                                             </TouchableOpacity>
                                      
//                                             <TouchableOpacity style={{backgroundColor:"#E3E3E3", width:"80%", height:70, flexDirection:"row", alignSelf:"center", alignItems:"center", borderRadius:20, marginVertical:15}}>
//                                     <MaterialIcons
//                                                 name="notifications"
//                                                 size={24}
//                                                 color={'#0E1822'}
//                                                 style={{ marginHorizontal: 10, overflow:"hidden",  color:"#0E1822"}}
//                                       />
                                
//                                 <Text style={{marginHorizontal:10, color:"#0E1822"}}> Notifications</Text>
//                                       <Entypo name="chevron-small-right" size={24} style={{marginVertical:-10, marginHorizontal:"37%", color:"#0E1822"}}/>
//                                             </TouchableOpacity>
                                      
//                                           <TouchableOpacity style={{backgroundColor:"#E3E3E3", width:"80%", height:70, flexDirection:"row", alignSelf:"center", alignItems:"center", borderRadius:20}}>
//                                     <Ionicons
//                                                 name="settings-outline"
//                                                 size={24}
//                                                 color={'#0E1822'}
//                                                 style={{ marginHorizontal: 10, overflow:"hidden",  color:"#0E1822"}}
//                                       />
                                
//                                 <Text style={{marginHorizontal:10, color:"#0E1822"}}> Settings</Text>
//                                       <Entypo name="chevron-small-right" size={24} style={{marginVertical:-10, marginHorizontal:"47%",  color:"#0E1822"}}/>
//                                             </TouchableOpacity>
// ​
//                     </View>
                   
//               </ImageBackground>
//           </View>
            
//     );
// }
// ​
// const styles= StyleSheet.create({
// backgroundImg:{
//    width:'100%',
//    height:'100%'
// },
// ​
// profileImg:{
//    width:200, 
//    height:200, 
//    borderRadius:100, 
//    bottom:85 
// },
// ​
// profileImgContainer:{    
//      width:'80%',
//      height: 215,
//      borderRadius:15,
//      backgroundColor:'#E3E3E3',
//      alignSelf:'center',
//      alignItems:'center',
//      top:65
// },
// ​
// topLeftIcon: {
//         borderWidth: 1,
//         borderRadius: 14,
//         borderColor: '#0E1822',
//         width: 45,
//         height: 45,
//         margin:25
// },
// ​
// userNameText:{
//   color:'black',
//   fontSize:20,
//   fontWeight:'100',
//   bottom: 75
// },
// ​
// editBtn:{
//   width:120,
//   height: 50,
//   backgroundColor:'black',
//   borderRadius: 15,
//   justifyContent:'center',
//   alignItems:'center',
//   bottom: 70
// },
// ​
// btnText:{
//   color: 'white',
//   fontSize: 16,
// },
// ​
// optionsContainer:{
//   top: 85
// },
// ​
// modalContainer:{
//   width: '85%',
//   height: 475,
//   backgroundColor:'#E3E3E3',
//   borderRadius:15,
//   alignSelf:'center',
//   top: 30,
//   alignItems:'center',
//   paddingVertical: 15
// },
// ​
// editprofileImgContainer:{
//  width: 200,
//  height: 200,
//  borderRadius: 150,
//  backgroundColor:'gray',
//  justifyContent:'center',
//  alignItems:'center'
// },
// ​
// editUserInput:{
//   borderColor:'black',
//   borderWidth:1,
//   height: 50,
//   paddingHorizontal: 65,
//   borderRadius: 15,
//   marginVertical: 45,
//   backgroundColor:'white',
// },
    
// updateBtn:{
//   width: 220,
//   height: 50,
//   backgroundColor:'black',
//   borderRadius: 15,
//   justifyContent:'center',
//   alignItems:'center'
// },
// ​
// modalText:{
//   fontSize: 18,
//   color:'white'
// },
// ​
// closeBtnContaainer:{
//   width: 37,
//   height: 37,
//   backgroundColor:'#FF5353',
//   borderRadius: 18.5,
//   alignItems:'center',
//   justifyContent:'center',
//   alignSelf:'flex-end',
//   right:15
// },
// ​
// uploadedImage:{
//   width: 200,
//   height:200,
//   borderRadius: 100
// },
// ​
// imgAddIcon:{
//   position:'absolute'
// },
// ​
// flatlist:{
//  height:280
// }
// ​
// }
