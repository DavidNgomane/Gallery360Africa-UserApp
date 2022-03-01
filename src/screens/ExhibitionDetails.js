import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Share, Pressable} from 'react-native';
import { StatusBar } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"

const image = require('../assets/images/dannie-jing-3GZlhROZIQg-unsplash.jpg');
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function ExhibitionDetails({route, navigation}) {

  const [liked, setLiked] = useState(false);

  const { exhibitionUid, date, address, description, exhibitionTitle } = route.params;
  //const exhibitionUid = "H4SpBE9qBETbsmaKL5IQ"

  const [ExhibitionDetails, setExhibitionDetails] = useState(null);
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
        <ImageBackground source={image} style={styles.image}  imageStyle={{ borderRadius: 20}}>
             <View style={{bottom:120, height: 70, flexDirection: "row"}}>
                <TouchableOpacity onPress = {() => navigation.navigate("Exhibition")} style={styles.BackButton}>
                  <Entypo
                    name="chevron-small-left"
                    size={40}
                    color={"#ffffff"}
                    />
              </TouchableOpacity>

              <Text style={styles.ExhibitionHeaderText}>Exhibition</Text>

             </View>
        </ImageBackground>
      </View>

              <FlatList 
                horizontal={true}
                data={ ExhibitionDetails }
                renderItem={({ item }) => {
                  return(
                    <View style={styles.DetailsContainer} >
                    <Text style={{color: "#000000", paddingBottom: 25, fontSize: 28.5, fontWeight: "bold"}}>{item.exhibitionTitle}</Text>
                    <Text style={{color: "#000000", paddingBottom: 15, fontSize: 14}}>{item.date}</Text>
                    <Text style={{color: "#000000", paddingBottom: 15, fontSize: 14}}>{item.address}</Text>
                    <Text style={{color: "#000000", paddingBottom: 40, fontSize: 14}}>{item.description}</Text>
             
                    <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={styles.VisitLocation} onPress={() => navigation.navigate('Map', {address: item.address})}>
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
    color: "#fff"
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