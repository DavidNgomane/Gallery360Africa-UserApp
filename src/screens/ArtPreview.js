import { View, Text, FlatList, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity, Navigator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//libraries
import ZoomView from "react-native-border-zoom-view";
import Toast from 'react-native-toast-message';
import { ToastProvider } from 'react-native-toast-notifications'

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from "react-native-vector-icons/Feather";
import Lightbox from 'react-native-lightbox';

import CommentsModal from '../assets/component/CommentsModal';
import CommentNumber from '../assets/redux/actions/CommentNumber';
import { following } from '../../redux/reducers/user';

function ArtPreview({route, navigation}) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState(null);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [items, SetItems] = useState(0);
  const [image, setImage] = useState("");
  const [uuid, setUId] = useState(auth().currentUser.uid);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [FullName, setFullName] = useState(null);
  const [artistDescription, setArtistDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistPhoto, setArtistPhoto] = useState("");

  const { artistUid, imageUID } = route.params;

  const getArtistDetailts = () => {
    firestore().collection("artists").where("artistUid", "==", artistUid).onSnapshot((snapShot) => {
      const photo = snapShot.docs.map((doc) => doc.data().photoUrl).map((doc) => doc);
      const name = snapShot.docs.map((doc) => doc.data().artistName);
      const descriptionOfArtist = snapShot.docs.map((doc) => doc.data().description);
      setArtistDescription(descriptionOfArtist);
      setArtistName(name);
      setArtistPhoto(photo);
    })
  }

  const onLikePress = (likes, imageUid, item) => {
    setIsLiked(!isLiked);
    firestore().collection("Market").doc(imageUid).update({
      likes :likes + 1,
    }).then((documentSnap) =>{
      onLike(imageUid, item);
      }).catch((error) => alert(error));
    // props.sendNotification(user.notificationToken, "New Like", `${props.currentUser.name} liked your post`, { type: 0, postId, user: firebase.auth().currentUser.uid })
}

const onLike = (imageUid, item) => {
  setCurrentUserLike(true)
  firestore()
      .collection("likes")
      .doc(imageUid)
      .collection("userLikes")
      .doc(uuid)
      .set({
        userUid: auth().currentUser.uid,
        item: item
      })
      .then(() => {}).catch((error) => {alert(error, "  error is onLike")})
}

const onDislikePress = (likes, imageUid, item) => {
  firestore().collection("Market").doc(imageUid).update({
        likes :likes - 1,
      }).then((documentSnap) =>{
        setIsLiked(false);
        onDisLike(imageUid, item);
        }).catch((error) => alert(error));
}


const onDisLike = (imageUid, item) => {
  setCurrentUserLike(false)
  firestore()
  .collection("likes")
  .doc(imageUid)
  .collection("userLikes")
  .doc(uuid)
      .delete().then(() => {}).catch((error) => alert(error));
}

const likesState = () => {

  firestore()
  .collection("likes")
      .doc(image)
      .collection("userLikes").doc(uuid).get().then((snapShot) => {

        console.log(image, "  the iamge is for the image UID")
        console.log(snapShot.id, "  the iamge is for the image UID")
  
      if (snapShot.id == auth().currentUser.uid) {
        setCurrentUserLike(true);

    } else if(snapShot.id !== uuid) {
      setCurrentUserLike(false);
    } else if (snapShot.id == undefined || snapShot.id == null) {
      setCurrentUserLike(false);
    } else {
          setCurrentUserLike(false);
    }

      }).catch((error) => alert(error));
    
    
}
// 
  const getArtDetails = () => {
    return firestore()
      .collection('Market')
      .where("ArtistUid", "==", artistUid).onSnapshot((snapShot) => {
        const query = snapShot.docs.map((documentSnap) =>
          documentSnap.data()
        );
        setPost(query);

        const imageUID = snapShot.docs.map((docSnap) => docSnap.data().ImageUid);
        // console.log(imageUID + "  this is the first Image UId");
        setImage(imageUID);
        
      });
    }

    const addToCart = async (image, name, price, artistUid, imageUid) => {
        try {
        return  await firestore().collection("cartItem").doc(uuid).collection("items").doc(imageUid).set({
          artUrl: image,
          artType: name,
          price: price,
          uuid: uuid,
          artistUid: artistUid,
          imageUid: imageUid, 
        }).then((snapShot) => {
          Toast.show({
            type: 'success',
            text2: 'Your item has been added to cart ',
         })
      }).catch((error) => alert(error));
      } catch (error) {
        return alert(error);
      }

    }

    const getCartItemNumber = () => {
      const uuid = auth()?.currentUser?.uid;
  
      return firestore().collection("cartItem").doc(uuid).onSnapshot((snapShot1) => {
        const getData = snapShot1.ref.collection("items").where("uuid", "==", uuid).onSnapshot((snapShot) => {
        const cartItems = snapShot.size;
        
        // console.log(cartItems + "  this the number of item added to cart")
        SetItems(cartItems);
      })
    })
    }

    useEffect(() => {
      const unregister = auth().onAuthStateChanged(userExist=>{
        
            if(userExist) {

               firestore().collection("users").where("uid", "==",userExist.uid).onSnapshot((snapShot) => {
                const users = snapShot.docs.map((document) => document.data().photoURL);
                const uName = snapShot.docs.map((document) => document.data().fullName);
                console.log(users + "  this the number of item added to cart")
                setPhotoURL(users);
                setFullName(uName);
              });
          }
      });

      return () => {
        unregister()
      }
  }, [])

 
  useEffect(() => {
    getArtDetails();
    getCartItemNumber();
    likesState();
    getArtistDetailts();
  return () => { likesState() }
  return () => getCartItemNumber();
  return () =>  getArtDetails();
  return () => getComentsNumber();
  return () => getArtistDetailts();
  
    // return () => {
    //   isMounted = false;
    // }
}, [imageUID]);

const onFollow = () => {
  firestore()
  .collection('following')
  .doc(auth().currentUser.uid)
  .collection('userFollowing')
  .doc(artistUid)
  .set({})
  .then(() => {
    setFollowing(true) 
    Toast.show({
      type: 'success',
      text2: 'Followed'
    })
  }).catch((error) => {
    alert(error)
  })
}

const onUnFollow = () => {
  firestore()
  .collection('following')
  .doc(auth().currentUser.uid)
  .collection('userFollowing')
  .doc(artistUid)
  .delete()
  .then(() => {
    Toast.show({
      type: 'error',
      text2: 'UnFollowed'
    })
    setFollowing(false)
  }).catch((error) => {
    alert(error)
  })
}

// if (props.following.indexOf(route.params.uid) > -1) {
//   setFollowing(true);
// }else {
//   setFollowingO(false)
// }

  return (
    <View>
      <FlatList
        data={post}
        keyExtractor={item => `${item.ImageUid}`}
        renderItem={({item}) => {
          
          return (
            <TouchableOpacity  activeOpacity={.8} onPress={() => navigation.navigate('Preview', {artUrl: item.artUrl})}>
            <View style={globalStyles.tikTokContainer}>
              
                  <Image 
                      source={{uri: item.artUrl}} 
                      resizeMode="cover" 
                      style={globalStyles.video}
                    />

              <View style={globalStyles.topIconView}>

                <TouchableOpacity
                  onPress={() => navigation.goBack(null)}
                  style={globalStyles.topLeftIcon}
                >
                  <Entypo 
                    name="chevron-thin-left"
                    size={22}
                    color={'#FFFFFF'}
                    style={{alignSelf: 'center', marginVertical: 10}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Cart', {Auid : artistUid, cartItem: items, uuid: uuid}, console.log(uuid))}
                  style={globalStyles.cartIcon}
                >
                  <View style={[Platform.OS == 'android' ? globalStyles.iconContainer : null]}>
                  {items > 0 ?
                  (<View style={{
                     position: 'absolute', height: 16, width: 16, borderRadius: 17, backgroundColor: 'rgba(95,197,123,0.9)', right:2,marginVertical:3, alignSelf:"flex-end", alignItems: 'center', justifyContent: 'center', zIndex: 2000,
                   }}>
                    <Text style={{ color: '#F5F5F5', fontWeight: 'bold', marginVertical:-10, fontSize:12 }}>
                      {items}
                    </Text>
                    </View>): (<View></View>)
                  }
                    {/* {setImage(item.ImageUid)} */}
                    <MaterialCommunityIcons
                      name="cart"
                      size={24}
                      color={'#FFFFFF'}
                      style={{alignSelf: 'center', marginVertical:10}}
                    />
    
            </View>
                </TouchableOpacity>
              </View>             
        
              <View style={globalStyles.uiContainer}>
                  { isModalVisible 

                  &&
                    <CommentsModal
                    photoURL={photoURL} 
                    fullName={FullName}
                    ImageUid={item.ImageUid}
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    />
                  }
                <View style={globalStyles.rightContainer}>
                 
                
                {route.params.uid !== firebase.auth().currentUser.uid ? (
                      <View>
                        {following ? (
                          <TouchableOpacity 
                            style={{marginVertical: 12}}
                            title="following"
                            onPress={() => onUnFollow()}
                          >
                          <Entypo name="remove-user" size={30} color={following ? 'white' : 'blue'}/>
                        </TouchableOpacity>
                        ) : (
                          <TouchableOpacity 
                            style={{marginVertical: 12}}
                            title="following"
                            onPress={() => onFollow()}
                            >
                            <Entypo name="add-user" size={30} color={following ? 'blue' : 'white'}/>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : null}
                


                  <TouchableOpacity 
                    style={{marginVertical: 12}}
                    onPress={() => setModalVisible(true)} 
                    activeOpacity={0.5}
                  >
                    <Fontisto name="comments" size={30} color={'#FFFFFF'} />
                    <CommentNumber ImageUid={item.ImageUid}/>
                  </TouchableOpacity>

                
                  <View style={{marginVertical:12}}>
                  {currentUserLike ?
                        (
                          <View style={{marginVertical:12}}>
                            <AntDesign name="heart" size={30} color="red" onPress={() => onDislikePress(item.likes, item.ImageUid, item.ArtistUid)} />
                            <Text style={{color: '#FFFFFF'}}>{item.likes}</Text>
                            </View>
                        )
                        :
                        (
                          <View style={{marginVertical:12}}>
                            <AntDesign name="heart" size={30} color="white" onPress={() => onLikePress(item.likes, item.ImageUid, item.ArtistUid)} />
                            <Text style={{color: '#FFFFFF'}}>{item.likes}</Text>
                          </View>
                        )
                    }
                  </View>
                  <TouchableOpacity style={{marginVertical: 12}} 
                  
                    onPress={() =>  { return addToCart(item.artUrl, item.artType, item.price, item.ArtistUid, item.ImageUid)}}>
                    <MaterialIcons
                      name="add-shopping-cart"
                      size={30}
                      color={'#FFFFFF'}
                    />
                  </TouchableOpacity>
                </View>
        
                <View style={globalStyles.bottomContainer}>
                  <View
                    blur="51"
                    transparant={true}
                    style={globalStyles.secondBottomContainer}
                  >
                    <View style={globalStyles.viewArtist}>
                    <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile', { description: artistDescription, artistUid: artistUid, photoUrl: artistPhoto, artistName: artistName})}>
                      <Image
                        source={{uri: `${artistPhoto}`}} 
                        style={globalStyles.artistImg} 
                      />
                      </TouchableOpacity>
                      <View
                        style={{marginHorizontal: 10, marginVertical: 6, width: '80%'}}
                      >
                          <Text style={globalStyles.artistName}>{artistName}</Text>
                          <Text 
                            style={{fontFamily: 'Poppins', color: '#F5F5F5'}}
                          >
                            {item.artType}
                          </Text>
                    
        
                        <Text style={globalStyles.price}>{`R${item.price}.00`}</Text>
                      </View>
                    </View>
                      <Text style={{fontWeight:"bold", fontSize:16, alignSelf:"center",marginVertical:-20, color: '#F5F5F5'}}>(1080x1080)cm</Text>
                    
                    <View style={globalStyles.viewDescription}>
                      <Text 
                        style={{color: '#F5F5F5'}}
                      >
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </View>
            </View>
        </View>
        </TouchableOpacity>
        );}}

        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
  </View>
  );
}

const mapStateToProps = (store) => ({
  following: store.userState.following
})

export default ArtPreview;