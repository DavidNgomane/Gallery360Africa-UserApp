import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class AppLoader extends Component {
   state = { animating: true }
   
   closeActivityIndicator = () => setTimeout(() => this.setState({
   animating: false }), 3000)
   
   componentDidMount = () => this.closeActivityIndicator()
   render() {
      const animating = this.state.animating
      return (
         <View style = {styles.container}>
            <ActivityIndicator
               animating = {animating}
               color = '#bc2b78'
               size = "large"
               style = {styles.activityIndicator}/>
               <Text style={{fontSize: 18, color: '#fff'}}>loading...</Text>
         </View>
      )
   }
}
export default AppLoader

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   marginTop: 70,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      height: '100%'
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
})