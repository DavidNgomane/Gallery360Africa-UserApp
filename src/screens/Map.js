import React, { useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const Map = ({route, navigation}) => {

const { address, latitude, longitude } = route.params

  return (
    <View>
      
      <Text>Gallery 360 Africa</Text>
      <MapView
      style={{width: "100%", height: "100%"}}
      initialRegion={{
       latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      // latitude: 28.237241291447393,
      // longitude: -25.746332726437977,
    }}
    >
      <Marker coordinate = {{
       latitude: parseFloat(latitude),
       longitude: parseFloat(longitude),
      }} 
    />
  </MapView>
    </View>
  )
}

export default Map;