import React, { useState, useRef, useEffect } from 'react';
import {View, Text, TextInput, Modal, StyleSheet, Animated, TouchableWithoutFeedback, Image, KeyboardAvoidingView, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
function CommentsModal({ImageUid, route, isVisible, onClose }) {
  const [comments, setComments] = useState(null);
  const [com, setCom] = useState("");
  const [numCom, setNumCom] = useState(0);
  const [post, setPost] = useState(ImageUid);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const modalAnimatedValue = useRef(new Animated.Value(0)).current
  const [isModalVisible, setModalVisible] = useState(isVisible);
  //
  const addComments = () => {
      const uid = auth()?.currentUser?.uid;
     const ImageUID = ImageUid;
     console.log(ImageUid + " the image uid 333")
      firestore().collection('comments').add({
            comments: com,
            uid: uid,
            photoURL: userImage,
            imageUID: ImageUID,
            userName: userName,
     }).then((key) => key.update({
       key : key.id,
     })).catch((error) => alert(error));
  }
//
  const getComents = () => {
    firestore().collection("comments").where("imageUID", "==", ImageUid).onSnapshot((snapShot) => {
          const commentNumber = snapShot.size;
          const comment = snapShot.docs.map((comment) => comment.data());
          setComments(comment);
          setNumCom(commentNumber);
    })
}
  useEffect(() => {
  //////
        console.log(ImageUid + " user photo");
    firestore().collection("users").where("uid", "==", auth().currentUser.uid).onSnapshot((snapShot) => {
      const displayName = snapShot.docs.map((docs) => docs.data().fullName);
      const userPhoto = snapShot.docs.map((docs) => docs.data().photoURL);
      //  console.log(displayName+ "  this user image");
      //  console.log(userPhoto + " user photo");
      setUserName(displayName);
      setUserImage(userPhoto);
    });
////////
getComents();
    /////
       if(isModalVisible) {
           Animated.timing(modalAnimatedValue, {
               toValue: 1,
               duration: 500,
               useNativeDriver: false
           }).start();
       }else {
        Animated.timing(modalAnimatedValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start(() => onClose());
       }
}, [isModalVisible])
  const modalY = modalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1000, 1000 - 720]
  })
  return (
    <Modal
        animationType='fade'
        transparent={true}
        visible={isVisible}
      >
       <KeyboardAvoidingView
         style={{
           flex: 1,
           backgroundColor: "rgba(16,18,27,0.1)",
           shadowColor: "#000",
           shadowOffset: {width: 3, height: 9},
           shadowOpacity: 4,
           shadowRadius: 20,
           elevation: 5
         }}
         behavior="padding"
       >
          <TouchableWithoutFeedback
              onPress={() => setModalVisible(false)}
          >
              <View
                 style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0
                 }}
              />
          </TouchableWithoutFeedback>
          <Animated.View
              style={{
                  position: 'absolute',
                  left: 0,
                  top: modalY,
                  width: '100%',
                  height: '100%',
                  padding: 24,
                  borderTopRightRadius: 24,
                  borderTopLeftRadius: 24,
                  backgroundColor: '#fff',
              }}
          >
          <View style={{flex: 3}}>
           <Text style={{color: '#000', textAlign: 'center', fontSize: 18}}>{numCom > 0? (<Text>{numCom}</Text>) :(<View></View>)} Comments</Text>
           <FlatList
           data={comments}
           style={{flexDirection:"column", }}
           renderItem = {({item}) => {return(
           <View style={{flexDirection: 'row', marginVertical: 10}}>
           <View style={{flexDirection:"row"}}>
             <Image source={require("../images/comments/person2.png")} style={styles.profilePic}/>
             <Text style={styles.textStyle}>{item.userName}</Text>
             </View>
         <View style={{alignSelf: "center", marginVertical:"1%", width:"100%",flexDirection:"column" }}>
            <Text style={{ alignSelf:"flex-start", alignItems:"flex-start" ,color: '#000', width: '77%',top:"35%", right:"17%"}}>{item.comments}</Text>
            <MaterialIcons name="favorite-outline" color="#000" size={25} style={{marginHorizontal:"45%", left:"15%", marginVertical:"-2%", bottom:"15%"}}/>
            </View>
         </View>
            )
          }}
            />
        </View>
          <View style={{flex: 3, flexDirection: 'row'}}>
            <View style={styles.userProfile}>
              <Image source={require("../images/comments/person3.png")} resizeMode="contain"/>
              </View>
          <View style={styles.inputStyle}>
           <View style={{flexDirection: 'row'}}>
          <TextInput
          style={{width:"85%"}}
              onChangeText={(comments) => setCom(comments)}
              placeholder="Comments..."
              placeholderTextColor="#828282"
              autoCapitalize="sentences"
            />
             <View style={{flexDirection: 'row', width: '29%',justifyContent: 'space-between'}}>
             {/* <Entypo style={{alignSelf: 'center'}} name="emoji-happy" color="#000" size={25}/> */}
              <TouchableOpacity onPress={addComments}>
              <MaterialCommunityIcons style={{alignSelf: 'center', marginVertical: 7}} name="send-outline" color="#000" size={30}/>
               </TouchableOpacity>
             </View>
            </View>
          </View>
          </View>
        </Animated.View>
       </KeyboardAvoidingView>
      </Modal>
  );
}
export default CommentsModal
const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    height: 50,
    width: 250,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#676767',
    bottom: 30,
    marginHorizontal: 15,
    marginVertical:7,
  },
  profilePic: {
      height: 40,
      width: 40,
      borderRadius: 40,
      backgroundColor: '#C4C4C4',
      alignItems: 'center',
  },
  textStyle: {
    color: '#000',
    fontSize:17,
    fontWeight:"bold",
    marginHorizontal: "5%",
    marginVertical: "3%"
  },
  userProfile: {
    height: 40,
      width: 40,
      borderRadius: 40,
      backgroundColor: '#C4C4C4',
      marginVertical: -22
  }
});