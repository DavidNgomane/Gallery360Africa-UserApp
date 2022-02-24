import React from 'react';
import {View, Text, ScrollView, Image, ImageBackground, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { StatusBar } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';

//const image = require('../assets/images/dannie-jing-3GZlhROZIQg-unsplash.jpg');
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const Items = ({ title, date, address, description}) => {
  return (
    <View style={styles.DetailsContainer} >
       <Text style={{color: "#000000", paddingBottom: 15, fontSize: 28, fontWeight: "bold"}}>{title}</Text>
       <Text style={{color: "#000000", paddingBottom: 15, fontSize: 14}}>{date}</Text>
       <Text style={{color: "#000000", paddingBottom: 15, fontSize: 14}}>{address}</Text>
       <Text style={{color: "#000000", paddingBottom: 40, fontSize: 14}}>{description}</Text>

       <View style={{flexDirection: "row"}}>
       <TouchableOpacity style={styles.VisitLocation}>
          <Text  style={styles.VisitLocationtxt}>Visit Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Heart}>
              <Entypo
                name="share"
                size={30}
                color={"#000000"}
                />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Heart}>
              <Entypo
                name="heart"
                size={30}
                color={"#000000"}
                />
        </TouchableOpacity>
       </View>
      
    </View>
  );
}

export default function ExhibitionDetails({navigation}) {

  const ExhibitionD = [ 
    {
        id: 1,
        title: "Artscapes Exhibition",
        date: "10 July - 22 July 22, 2022",
        address: "354 Jan Smuts Ave, Craighall, Johannesburg, 2024",
        description: "Suspendisse blandit magna ipsum, malesuada pellentesque est sagittis at. Pellentesque eu mi quis ante consectetur aliquam id eu felis. Nam vehicula risus vel tempus aliquet.",
    }
]

  return (
    <View style={styles.container}> 
      <View style={styles.Top}>
        <ImageBackground source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX9G77jysC7-do_VpXeFzNvd34vEN4rLxLmw&usqp=CAU'}} style={styles.image}  imageStyle={{ borderRadius: 20}}>
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
                data={ ExhibitionD }
                renderItem={({ item }) => {
                  return(
                  <Items title={item.title} date={item.date} address={item.address} description={item.description}/>
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


