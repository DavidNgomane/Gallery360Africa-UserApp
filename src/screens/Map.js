import { View, Text } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const Map = ({route, navigation}) => {

const { address } = route.params

  return (
    <View>
      
      <Text>Gallery 360 Africa</Text>
      <MapView
      style={{width: "100%", height: "100%"}}
      initialRegion={{
      latitude: 28.045733,
      longitude: -26.197494,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      // latitude: 28.237241291447393,
      // longitude: -25.746332726437977,
    }}
  />
    </View>
  )
}

export default Map;