import { View, Text } from 'react-native'
import React from 'react'

const Home = ({route}) => {

  const { userUid } = route.params;
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home