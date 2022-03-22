import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { globalStyles } from "../assets/styles/GlobalStyles";

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import YoutubePlayer from 'react-native-youtube-iframe';


const ArtistProfile = ({route, navigation}) => {

  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const controlRef = useRef();
  const onStateChange = (state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
    if (state !== 'playing') {
      setPlaying(false);
    }
  };
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };
  const seekBackAndForth = (control) => {
    console.log('currentTime');
    controlRef.current?.getCurrentTime().then((currentTime) => {
      control === 'forward'
        ? controlRef.current?.seekTo(currentTime + 15, true)
        : controlRef.current?.seekTo(currentTime - 15, true);
    });
  };
  const muteVideo = () => setMute(!isMute);
  const ControlIcon = ({name, onPress}) => (
    <Icon onPress={onPress} name={name} size={40} color="#fff" />
  );

  const { artistUid, artistPhoto, artistName, description } = route.params;
  // 
  const[art, setArt] = useState(null)
  const getArt = () => {
    return firestore().collection('Market').where("ArtistUid", "==", artistUid).onSnapshot((snapshot) => {
      const allArt = snapshot.docs.map(docSnap => docSnap.data());
      setArt(allArt);
    }) 
  }
  useEffect(() => {
    getArt();
  }, [])

  return (
    <ImageBackground 
      source={imageBg} 
      resizeMode="stretch" 
      style={globalStyles.container}
    >
      <View style={styles.TopContainer}>
        {/* <View style={{justifyContent: "center", height: 70}}>
          <TouchableOpacity
            onPress={() =>navigation.navigate("Home")}
            style={styles.BackButton}
          >
            <Entypo
              name="chevron-small-left"
              size={40}
              color={"#000"}
            />
          </TouchableOpacity>
        </View> */}

<View style={styles.VideoContainer}>
          {/* <Image 
            source={{uri: 'https://images.unsplash.com/photo-1614315394848-b3375bf3f39c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fHZpZGVvfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60'}}
            style={{width: 325, height: 250, borderRadius: 15}}
          /> */}
           <YoutubePlayer
              height={300}
              play={true}
              ref={controlRef}
              play={playing}
              mute={isMute}
              videoId={'84WIaK3bl_s'}
              style={{width: 325, height: 350, borderRadius: 15}}
           />
          </View>
      </View>

                <View style={styles.MiddleContainer}>
                  <View style={styles.listItem} >
                    <View style={{flexDirection: "row", width: '91%'}}>
                      <Image 
                        source={{uri: artistPhoto}} 
                        style={styles.img2}
                      />
                      <View style={{width: '100%'}}>
                        <Text style={{ color: "#000000", marginLeft: 10, top: 6, fontSize: 20}}>{artistName}</Text>
                        <Text style={{ color: "#ceb89e", marginLeft: 10, top: 3}}>Artist</Text>

                        <TouchableOpacity >
                          <Ionicons 
                            name="md-person-add" size={24} 
                            color={'#000'}
                            style={{alignSelf: 'flex-end', marginVertical: -25, marginHorizontal: 70, bottom: 3}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{width: '95%', padding: 5}}>
                      <Text style={{color: "#000000"}}>{description}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.BottomContainer}>
                  <Text style={styles.moreText}>More Works</Text>
                    <FlatList 
                      horizontal={true}
                      data={art}
                      keyExtractor={item => `${item.ImageUid}`}
                      renderItem={({ item }) => {
                        return(
                          <View style={styles.listItem2} >
                            <TouchableOpacity onPress={() => navigation.navigate('ArtPreview', {artistUid, likes: item.likes, price: item.price, description: item.description, artUrl: item.artUrl, artistPhoto: item.artistPhoto, artistName: item.artistName, ImageUid: item.ImageUid, artType: item.artType, artistDescription: artistDescription})} >
                              <Image 
                                source={{uri:item.artUrl}} 
                                style={styles.img}
                              />
                              <View style={styles.priceView}>
                                <Text style={styles.price} >{item.price}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )
                      }}
                    />
                </View>
      </ImageBackground>
  );
}

const imageBg = require('../assets/images/home.png')

export default ArtistProfile;

const styles = StyleSheet.create({
  TopContainer: {
    top: 50
  },
    MiddleContainer: {
        flex: 6,
        top: 65
        // backgroundColor: "red"
    },
    BottomContainer: {
       top: 10
    },
    moreText: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20
    },
    img: {
        height: 150,
        width: 120,
        borderRadius: 15
      },
      listItem2: {
        paddingLeft: 15,
        paddingTop: 20,
        flexDirection: "column",
        marginBottom: 45
      },
      price: {
        color: "#ffffff", 
        textAlign: "center", 
        fontWeight: "bold"
    },
    priceView: {
        backgroundColor: 'rgba(16, 18, 27, 0.4)', 
        marginVertical: -25, 
        borderRadius: 20,
        alignSelf: 'center',
        height: 20,
        width: '90%'
      },
      listItem: {
        paddingTop: 20,
        marginLeft: 15,
        width: '100%',
        height: 100,
      },
      img2: {
        height: 50,
        width: 50,
        borderRadius: 25,
        // borderColor: 'rgba(196, 196, 196, 0.51)',
        // borderWidth: 4,
        marginLeft: 3
      },
      BackButton: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        marginHorizontal: 15,
        marginTop: 10
      },
      Heart: {
        alignSelf: "flex-end",
        marginHorizontal: 160,
        bottom: 15
      },
      VideoContainer: {
        borderRadius: 15, 
        width: 325, 
        height: 170, 
        backgroundColor: "gray", 
        alignSelf: "center",
        marginTop: 10
    }
})