import { View, Text, FlatList, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// icons
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CommentsModal from '../assets/component/CommentsModal';

const ArtPreview = ({route, navigation}) => {

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [post, setPost] = useState(null);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [items, SetItems] = useState(0);
  const [image, setImage] = useState("");
  const [uuid, setUId] = useState(auth().currentUser.uid);
  const [currentUserLike, setCurrentUserLike] = useState(false);
<<<<<<< Updated upstream
=======
  const [photoURL, setPhotoURL] = useState(null);
  const [FullName, setFullName] = useState(null);
  const [artistPhoto, setArtistPhoto] = useState(null);
  const [artistName, setArtistName] = useState(null);
>>>>>>> Stashed changes

  const { artistUid, imageUID  } = route.params;

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

const getArtistDetails = () => {
  return firestore().collection("artists").where("artistUid", "==", artistUid).onSnapshot((snapShot) => {
    const photo = snapShot.docs.map((doc) => doc.data().photoUrl);
    const name = snapShot.docs.map((doc) => doc.data().artistName);
    setArtistName(name);
    setArtistPhoto(photo);

  })
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
  

    const onLikePress = (likes, artKey) => {
    const likesToAdd = isLiked ? -1 : 1;
    // setPost({
    //   ...post,
    //   likes: likes + likesToAdd,
    // });
  firestore().collection("Market").doc(artKey).update({
      likes: likes + likesToAdd,
    }).then(() =>{
      if(artKey) {
        setIsLiked(!isLiked);
      }
      if (!artKey) {
        setIsLiked(isLiked);
      }
      }).catch((error) => alert(error));
    
  };
  // 
  const getArtDetails = () => {
    return firestore()
      .collection('Market')
      .where("ArtistUid", "==", artistUid).onSnapshot((snapShot) => {
        const query = snapShot.docs.map((documentSnap) =>
          documentSnap.data()
        );
        setPost(query);
      });
    }

    const addToCart = async (image, name, price) => {

      const uuid = auth()?.currentUser?.uid;
  
        try {
       
      const uuid = auth()?.currentUser?.uid;
  
        return  await firestore().collection("cartItem").add({
          artUrl: image,
          artType: name,
          price: price,
          uuid: uuid,
        }).then((snapShot) =>{alert("your item has been added to cart");
        snapShot.update({keyy: snapShot.id})
      }).catch((error) => alert(error));
      } catch (error) {
        return alert(error);
      }
    }



    const getCartItemNumber = () => {
      const uuid = auth()?.currentUser?.uid;
  
      return firestore().collection("cartItem").where("uuid", "==",uuid).onSnapshot((snapShot) => {
        const cartItems = snapShot.size;
        // console.log(cartItems + "  this the number of item added to cart")
        SetItems(cartItems);
<<<<<<< Updated upstream
=======
      })
    })
    }

    useEffect(() => {
      const unregister = auth().onAuthStateChanged(userExist=>{
        
            if(userExist) {

               firestore().collection("users").where("uid", "==",userExist.uid).onSnapshot((snapShot) => {
                const users = snapShot.docs.map((document) => document.data().photoURL);
                const uName = snapShot.docs.map((document) => document.data().fullName);
                setPhotoURL(users);
                setFullName(uName);
              });
            
          }
        
>>>>>>> Stashed changes
      });
    }
    
  useEffect(() => {
    let isMounted = true;
    getCartItemNumber();
<<<<<<< Updated upstream
    getArtDetails();
    return () => {
      isMounted = false;
    }
}, []);
=======
    likesState();
    getArtistDetails();

  return () => { likesState() }
  return () => getCartItemNumber();
  return () =>  getArtDetails();
  return () => getComentsNumber();
  return () => getArtistDetails();
  
    // return () => {
    //   isMounted = false;
    // }
}, [imageUID]);
>>>>>>> Stashed changes

const onFollow = () => {
  firestore()
  .collection('following'
  ).doc(auth().currentUser.uid)
  .collection('userFollowing')
  .doc(artistUid)
  .set({})
  .then((snapShot) => {
    setFollowing(!following)
    alert('followed!')
  })
}

const onUnFollow = () => {
  firestore()
  .collection('following'
  ).doc(auth().currentUser.uid)
  .collection('userFollowing')
  .doc(artistUid)
  .delete({})
  .then((snapShot) => {
    setFollowing(!following)
    alert('Unfollowed!')
  })
  
}

  return (
    <View
      style={{ height: Dimensions.get('window').height - 1}}
    >
      <FlatList
        data={post}
        keyExtractor={item => `${item.ImageUid}`}
        renderItem={({item}) => {
          return (
            <View style={globalStyles.tikTokContainer}>
              <TouchableWithoutFeedback>
                 <Image 
                  source={{uri: item.artUrl}} 
                  resizeMode="cover" 
                  style={globalStyles.video}
                />
              </TouchableWithoutFeedback>

              <View style={globalStyles.topIconView}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Market')}
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
                  onPress={() => navigation.navigate('Cart', {Auid : artistUid})}
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
                  { isModalVisible &&
                    <CommentsModal
                      imageUID={item.ImageUid}
                      isVisible={isModalVisible}
                      onClose={() => setModalVisible(false)}
                    />
                  }
                <View style={globalStyles.rightContainer}>
                 
<<<<<<< Updated upstream
                 {following ? (
                    <TouchableOpacity 
                    style={{marginVertical: 12}}
                    title="following"
                    onPress={() => onFollow()}
                  >
                    <SimpleLineIcons name="user-follow" size={24} color={following ? 'white' : 'blue'}/>
                  </TouchableOpacity>
                 ): (
                  <TouchableOpacity 
                  style={{marginVertical: 12}}
                  title="follow"
                  onPress={() => onUnFollow()}
                >
                  <SimpleLineIcons name="user-follow" size={24} color={following ? 'white' : 'blue'} />
                </TouchableOpacity>
                 )}
=======
                
                {route.params.uid !== firebase.auth().currentUser.uid ? (
                      <View>
                        {following ? (
                          <TouchableOpacity 
                            style={{marginVertical: 10}}
                            title="following"
                            onPress={() => onUnFollow()}
                          >
                          <Entypo name="remove-user" size={30} color={following ? 'white' : 'blue'}/>
                        </TouchableOpacity>
                        ) : (
                          <TouchableOpacity 
                            style={{marginVertical: 10}}
                            title="following"
                            onPress={() => onFollow()}
                            >
                            <Entypo name="add-user" size={30} color={following ? 'blue' : 'white'}/>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : null}
                

>>>>>>> Stashed changes

                  <TouchableOpacity 
                    style={{marginVertical: 10}}
                    onPress={() => setModalVisible(true)} 
                    activeOpacity={0.5}
                  >
                    <Fontisto name="comments" size={24} color={'#FFFFFF'} />
                    <Text style={{color: '#FFFFFF'}}>12.5K</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{marginVertical: 12}}  onPress={() => onLikePress(item.likes, item.ImageUid)}>
                  <AntDesign name="heart" size={24} color={isLiked ? 'red' : 'white'} />
                  <Text style={{color: '#FFFFFF'}}>{item.likes}</Text>
                  </TouchableOpacity>

<<<<<<< Updated upstream
                  <TouchableOpacity style={{marginVertical: 12}} onPress={() => addToCart(item.artUrl, item.artType, item.price)}>
=======
                
                  <View style={{marginVertical:10}}>
                  {currentUserLike ?
                        (
                          <View style={{marginVertical:10}}>
                            <AntDesign name="heart" size={30} color="red" onPress={() => onDislikePress(item.likes, item.ImageUid, item.ArtistUid)} />
                            { item.likes > 0 ? (
                            <Text style={{color: '#FFFFFF'}}>{item.likes}</Text>
                            ) : (
                              <View></View>
                            )
        }
                            </View>
                        )
                        :
                        (
                          <View style={{marginVertical:10}}>
                            <AntDesign name="heart" size={30} color="white" onPress={() => onLikePress(item.likes, item.ImageUid, item.ArtistUid)} />

                            <Text style={{color: '#FFFFFF'}}>{item.likes}</Text>

                          </View>
                        )
                    }
                  </View>
                  <TouchableOpacity style={{marginVertical: 10}} 
                  
                    onPress={() =>  { return addToCart(item.artUrl, item.artType, item.price, item.ArtistUid, item.ImageUid)}}>
>>>>>>> Stashed changes
                    <MaterialIcons
                      name="add-shopping-cart"
                      size={34}
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
                      <Image 
                        source={{uri: `${artistPhoto}`}} 
                        style={globalStyles.artistImg} 
                      />
                      <View
                        style={{marginHorizontal: 10, marginVertical: 6, width: '80%'}}
                      >
                        <TouchableOpacity>
                          <Text style={globalStyles.artistName}>{artistName}</Text>
                          <Text 
                            style={{fontFamily: 'Poppins', color: '#F5F5F5'}}
                          >
                            {item.artType}
                          </Text>
                        </TouchableOpacity>

                        <Text style={globalStyles.price}>{item.price}</Text>
                      </View>
                    </View>
                    <View style={{alignSelf:"center", marginVertical:-20}}>
                      <Text style={{color:"#F5F5F5", fontSize:14, fontWeight:"bold"}}> 1080cm X 1080cm</Text>
                    </View>
                    
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
        );}}

        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
  </View>
  );
}

export default ArtPreview;