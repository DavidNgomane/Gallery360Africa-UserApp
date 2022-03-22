import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Share } from 'react-native';
import { StatusBar } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Geocoder from 'react-native-geocoder-reborn';


// const image = require('../assets/images/dannie-jing-3GZlhROZIQg-unsplash.jpg');
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function ExhibitionDetails({route, navigation}) {

  const [liked, setLiked] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [ExhibitionDetails, setExhibitionDetails] = useState(null);



  const { exhibitionUid, exhibitionImage, address, description, exhibitionTitle, date } = route.params;
  // const exhibitionUid = "H4SpBE9qBETbsmaKL5IQ"

  const getLocation = () => {
    Geocoder.fallbackToGoogle("AIzaSyAkTCT8YLMY6YhGoPMnu5UEjJ_8eYepEJs");
    Geocoder.geocodeAddress(address).then((response) => {
      const lat = response.map((res) =>res.position.lat).map((res) => res);
      const long = response.map((res) => res.position.lng).map((res) => res);
      setLatitude(lat);
      setLongitude(long);

        // console.log(lat, " the latitude", long, "  the longitude")
    }).catch((error) => {
      console.log(error, ":Error in code ")
    });
    
  } 

  useEffect(() => {
  
     return () => {
       getLocation();
     }
  },[])

  const getExhibitionDetails = () => {
    return firestore().collection('exhibition').where("exhibitionUid", "==", exhibitionUid).onSnapshot((snapShot) => {
      const allExhibitionDetails = snapShot.docs.map(docSnap => docSnap.data());
    
      setExhibitionDetails(allExhibitionDetails);
    })
  }
  useEffect(() => {
    getExhibitionDetails();
  }, [])

  const onShare = async () => {
    try {
      const result = await Share.share({
       message: `${address}, ${date}, ${description}`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}> 
      <View style={styles.Top}>
        <ImageBackground source={{uri: exhibitionImage}} style={styles.image}  imageStyle={{ borderRadius: 20}}>
        </ImageBackground>
      </View>

              <FlatList 
                horizontal={true}
                data={ ExhibitionDetails }
                renderItem={({ item }) => {
                  return(
                    <View style={styles.DetailsContainer} >
                    <Text style={{color: "#000000", paddingBottom: 25, fontSize: 25, fontWeight: "bold"}}>{item.exhibitionTitle}</Text>
                    <Text style={{color: "#000000", paddingBottom: 15, fontSize: 14, right: 45}}>{item.date}</Text>
                    <Text style={{color: "#000000", paddingBottom: 15, fontSize: 14}}>{item.address}</Text>
                    <Text style={{color: "#000000", paddingBottom: 40, fontSize: 14}}>{item.description}</Text>
             
                    <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={styles.VisitLocation} onPress={() => navigation.navigate('Map', {address: item.address, latitude: latitude, longitude: longitude})}>
                       <Text  style={styles.VisitLocationtxt}>Visit Location</Text>
                     </TouchableOpacity>
             
                     <TouchableOpacity style={styles.Heart} onPress={() => onShare({date: item.date, address: item.address, description: item.description})}>
                           <Entypo
                             name="share"
                             size={30}
                             color={"#000000"}
                             />
                     </TouchableOpacity>
             
                     <TouchableOpacity style={styles.Heart} onPress={() => setLiked((isLiked) => !isLiked)}>
                           <Entypo
                             name={liked ? "heart" : "heart-outlined"}
                             size={32}
                             color={liked ? "red" : "black"}
                             />
                     </TouchableOpacity>
                    </View>
                   
                 </View>
                  )}
              }
                  keyExtractor = {(item) => item.id}
              />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: "100%"
  },
  Top:{
    marginTop:  STATUSBAR_HEIGHT,
    height: 370,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: -10,
    marginVertical: -170
  },
  image: {
    flex: 1, 
    justifyContent: "center", 
    borderBottomRightRadius: 20, 
    borderBottomLeftRadius: 20,
    height: "100%",
    width: "100%",
  },
  BackButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    marginHorizontal: 20,
    borderColor: "#ffffff"
  },
  ExhibitionHeaderText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    left: 35,
    top: 5
  },
  DetailsContainer: {
    width: 290,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    alignSelf:'center',
    marginHorizontal: 35,
    padding: 10,
    height: "65%",
    marginTop: 25,
    backgroundColor: "rgba(255,255,355,0.4)",
    borderColor: "#ffffff",
    marginVertical: "-5%",
    position: "relative"
  },
  VisitLocation: {
    backgroundColor: "#000000",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    height: 50,
    width: 178,
    marginLeft: 8,
    marginVertical: 8,
  },
  VisitLocationtxt: {
    textAlign: "center",
    fontSize: 14,
    color: "#ffffff"
  },
  Heart: {
    alignSelf: "flex-end",
    marginHorizontal: 10,
    marginVertical: 16
  },
});