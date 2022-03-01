import { View, Text, FlatList, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//libraries
import ZoomView from "react-native-border-zoom-view";
// icons
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CommentsModal from '../assets/component/CommentsModal';

function ArtPreview({route, navigation}) {

   const [isModalVisible, setModalVisible] = React.useState(false);

  const { artistUid, imageUID } = route.params;
  
  //const artistUid = "3RcDICKP55zQEqBHHdXl"

  const [post, setPost] = useState(null);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState({state: false});
  const [following, setFollowing] = useState(false);
  const [items, SetItems] = useState(0);
  const [image, setImage] = useState("");
  const [commentNumber, setCommentNumber] = useState(0);


  const onLikePress = (likes, imageUid, artistUid) => {
    const likesToAdd = isLiked ? -1 : 1;
    // setPost({
    //   ...post,
    //   likes: likes + likesToAdd,
    // });
      try {
   firestore().collection("Market").doc(imageUid).update({
      likes :likes + likesToAdd,
    }).then((documentSnap) =>{
      }).catch((error) => alert(error));
    // console.log(artistUid+ "  thid is ht thiings")
      // setIsLiked(!isLiked);
      updateLikes(likes, imageUid, artistUid);
    }
     catch(error) {
       alert(error);
     }
  };

  const componentWillReceiveProps = () => {
    updateLikes();
  }
  //
  const updateLikes = (likes, imageUid, artistUid) => {
  //   try {
  //   firestore().collection("likes").doc(imageUid).set({
  //     uUID : auth().currentUser.uid,
  //     imageUID: imageUid,
  //     artistUID: artistUid,
  //     isLiked :Boolean = true,
  //   }).then(() => {}).catch((error) => alert(error));
  // }
  // catch(error) {
  //   alert(error);
  // }
  };
  //
  // const getLikes = async () => {
  //  await firestore().collection("likes").where("uUID", "==", auth().currentUser.uid).onSnapshot((snapShot) => {
    
  //   const likes = snapShot.docs.map((document) =>document.data().likes);
  //    const imageuid = snapShot.docs.map((document) => document.exists)
  //   setLike(likes)
  //   console.log(likes + " the like boolean like")
  
  //   if(imageuid) {
  //     setIsLiked(!isLiked);

  //   } 
    
   

  //  });
  
  
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
      });
    }

    const getComentsNumber = () => {
      firestore().collection("comments").where("imageUID", "==", "9bM0wbzVqUJDgP9Lt5Iy").onSnapshot((snapShot) => {
            const commentNumbers = snapShot.size;
            setCommentNumber(commentNumbers);
      })
    }
    
  useEffect(() => {
    let isMounted = true;
    getCartItemNumber();
    getArtDetails();
    getComentsNumber();
    // getLikes();
    return () => {
      isMounted = false;
    }
}, []);

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
    <View>
      <FlatList
        data={post}
        keyExtractor={item => `${item.ImageUid}`}
        renderItem={({item}) => {
          
          return (
            <View style={globalStyles.tikTokContainer}>
              
                  <ZoomView style={globalStyles.video}>
                 <Image 
                  source={{uri: item.artUrl}} 
                  resizeMode="cover" 
                  style={globalStyles.video}
                />
                </ZoomView>
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
                  onPress={() => navigation.navigate('Cart', {Auid : artistUid, cartItem: items})}
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
                    ImageUid={item.ImageUid}
                      isVisible={isModalVisible}
                      onClose={() => setModalVisible(false)}
                    />
                  }
                <View style={globalStyles.rightContainer}>
                 
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

                  <TouchableOpacity 
                    style={{marginVertical: 12}}
                    onPress={() => setModalVisible(true)} 
                    activeOpacity={0.5}
                  >
                    <Fontisto name="comments" size={24} color={'#FFFFFF'} />
                    <Text style={{color: '#FFFFFF'}}>{commentNumber}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{marginVertical: 12}}  onPress={() => onLikePress(item.likes, item.ImageUid, item.ArtistUid)}>
                  <AntDesign name="heart" size={24} color={like ? 'red' : 'white'} />
                  <Text style={{color: '#FFFFFF'}}>{item.likes}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{marginVertical: 12}} onPress={() => addToCart(item.artUrl, item.artType, item.price, item.uuid)}>
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
                        source={{uri: item.artistPhoto}} 
                        style={globalStyles.artistImg} 
                      />
                      <View
                        style={{marginHorizontal: 10, marginVertical: 6, width: '80%'}}
                      >
                        <TouchableOpacity>
                          <Text style={globalStyles.artistName}>{item.artistName}</Text>
                          <Text 
                            style={{fontFamily: 'Poppins', color: '#F5F5F5'}}
                          >
                            {item.artType}
                          </Text>
                        </TouchableOpacity>

                        <Text style={globalStyles.price}>{`R${item.price}.00`}</Text>
                      </View>
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