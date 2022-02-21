import React, { useState } from 'react';
import {View, Text, TextInput, Modal, StyleSheet, Animated, TouchableWithoutFeedback, Image, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CommentsModal = ({ImageUid, route, isVisible, onClose }) => { 

  const [comments, setComments] = useState('');
  const [post, setPost] = useState('')
  const [user, setUsers] = useState('')

  //const { ImageUid } = route.params;

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current

  const [isModalVisible, setModalVisible] = React.useState(isVisible);

  const addComments = () => {
      const uid = auth()?.currentUser?.uid;
     const ImageUid = ImageUid;
      firestore().collection('comments').doc(user.uid).set({
            comments: comments,
            uid: uid
     })
  }

  React.useEffect(() => {
    console.log(post + "   this is the uid")
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
      outputRange: [1000, 1000 - 680]
  })

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior='position'>
    <Modal
        animationType='fade'
        transparent={true}
        visible={isVisible}
      >
       <View
         style={{
           flex: 1, 
           backgroundColor: 'rgba(0, 0, 0, 0.7)',
        
           shadowColor: "#000",
           shadowOffset: {width: 3, height: 9},
           shadowOpacity: 4,
           shadowRadius: 20,
           elevation: 5
         }}
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
           <Text style={{color: '#000', textAlign: 'center', fontSize: 18}}>2 Comments</Text>
         <View>
           <View style={{flexDirection: 'row', marginVertical: 20}}> 
           <View style={styles.profilePic}><Image source={require('../assets/images/modal/person1.png')}/></View>
           <View>
             <Text style={styles.textStyle}>John Wick</Text>
             </View>
         </View>
         <View style={{alignSelf: 'flex-end', marginVertical: -20}}>
             <MaterialIcons name="favorite-outline" color="#000" size={25}/> 
          </View>
            <Text style={{color: '#000'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text> 
            </View>

            <View>
           <View style={{flexDirection: 'row', marginVertical: 20}}> 
           <View style={styles.profilePic}><Image source={require('../assets/images/modal/person2.png')}/></View>
           <View><Text style={styles.textStyle}>John Wick</Text></View>
         </View>
         <View style={{alignSelf: 'flex-end', marginVertical: -20}}>
             <MaterialIcons name="favorite-outline" color="#000" size={25}/> 
          </View>
         <Text style={{color: '#000'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text> 
            </View>      
        </View> 
          
          <View style={{flex: 3, flexDirection: 'row'}}>
            <View style={styles.userProfile}><Image source={require('../assets/images/modal/person3.png')}/></View>
          <View style={styles.inputStyle}>
           <View style={{flexDirection: 'row'}}>   
          <TextInput
              onChangeText={(comments) => setComments(comments)}
              placeholder="Comments..."
              placeholderTextColor="#828282"
              autoCapitalize="sentences"
            />
             <View style={{flexDirection: 'row', marginHorizontal: 85, width: '29%',justifyContent: 'space-between'}}>
             <Entypo style={{alignSelf: 'center'}} name="emoji-happy" color="#000" size={25}/> 
              <TouchableOpacity onPress={addComments}>
              <MaterialCommunityIcons style={{marginRight: 5, alignSelf: 'center', marginVertical: 7}} name="send-outline" color="#000" size={30}/>
               </TouchableOpacity> 
             </View>
            </View>
          </View>
          </View>
         
        </Animated.View>
         
       </View>

      </Modal>
      </KeyboardAvoidingView>
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
    marginHorizontal: 15
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
    marginHorizontal: 12,
    marginVertical: 15
  },

  userProfile: {
    height: 40,
      width: 40,
      borderRadius: 40,
      backgroundColor: '#C4C4C4',
      marginVertical: -22
  }

});


