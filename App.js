import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
// Import screens
import Market from './src/screens/Market';
import Exhibition from './src/screens/Exhibition';
import ExhibitionDetails from './src/screens/ExhibitionDetails';
import Splash from './src/screens/Splash';
import Onboarding from './src/screens/Onboarding';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import ArtPreview from './src/screens/ArtPreview';
import ArtistProfile from './src/screens/ArtistProfile';
import Cart from './src/screens/Cart';
import PaymentSuccesful from './src/screens/PaymentSuccesful';
import PaymentFailure from './src/screens/PaymentFailure';
import PaymentForm from './src/screens/PaymentForm';
import DeliveryAddress from './src/screens/DeliveryAddress';
import ShippingAddress from './src/screens/ShippingAddress';
import Preview from './src/screens/Preview';
import UserProfile from './src/screens/UserProfile';
import Map from './src/screens/Map';


const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showPageIndicator: false,
        tabBarPressColor: '#000',
        swipeEnabled: false,
        tabBarStyle: {
          height: 50,
          minHeight: 0,
          borderRadius: 20,
          marginHorizontal: 12,
          width: 'auto',
          backgroundColor: '#fff',
          headerShadowVisible: false,
          margin: 5
        },
        tabBarActiveTintColor: '#ceb89e',
        tabBarInactiveTintColor: '#000',
        tabBarPressColor: '#000',
      }}
    >
      <Tab.Screen name='Market' component={Market} />
      <Tab.Screen name='Exhibition' component={Exhibition} />
    </Tab.Navigator>
  )
}
const App = ({navigation}) => {
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 13,
          color: 'green'
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 13,
          color: 'red'
        }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };
  const [user, setuser] = useState('');
  const [uid, setUID] = useState("");
  const [cartItem, setCartItem] = useState(null);
  const [User, setUser] = useState(null);
  const [fullName, setFullName] = useState(null);


    useEffect(() => {
      const unregister = auth().onAuthStateChanged(userExist=>{
        
            if(userExist) {
               setuser(userExist);

               firestore().collection("users").where("uid", "==",userExist.uid).onSnapshot((snapShot) => {
                const users = snapShot.docs.map((document) => document.data().photoURL);
                const uName = snapShot.docs.map((document) => document.data().fullName);
                // console.log(cartItems + "  this the number of item added to cart")
                setUser(users);
                setFullName(uName);
              });
            
              firestore().collection("cartItem").where("uuid", "==",userExist.uid).onSnapshot((snapShot) => {
                const cartItems = snapShot.size;
                // console.log(cartItems + "  this the number of item added to cart")
                setCartItem(cartItems);
              });
          }
            else {
              setuser("");
          }
      });

      return () => {
        unregister()
      }
  }, [])

  useEffect(() => {
 
  },[])

const uuid = auth()?.currentUser?.uid;
  
  return (
    <>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'
      >
       <Stack.Screen 
          name='Home' 
          component={TabNavigator}
          options={({navigation}) => ({
            
            // headerLeft: () => {return null;},
            headerBackVisible: false,
            headerShadowVisible: false,
            title: `Hi ${fullName}`,
            headerRight: () => (
              <View style={{flexDirection: 'row', width: 74, justifyContent: 'space-between'}}>

                <TouchableOpacity onPress={() => navigation.navigate('Cart', {cartItem: cartItem, uuid: uuid})}>
                  <MaterialIcons name='shopping-cart' size={30} color={'#000'}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('UserProfile', {photoURL: User, fullName: fullName, uuid: uuid, cartItem: cartItem})}>
                  <Image source={{uri: `${User}`}} style={{width: 30, height:30, borderRadius:30, backgroundColor:"lightgrey" }}/>
                </TouchableOpacity>
              </View>
            )       
          })}
          
        />
        {user?
           <>
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='ArtistProfile' component={ArtistProfile}/>
			<Stack.Screen options={{headerShown: false}} name="ArtPreview" component={ArtPreview} />
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='Cart' component={Cart} />
			<Stack.Screen options={{headerShown: false}} name='PaymentSuccesful' component={PaymentSuccesful} />
			<Stack.Screen options={{headerShown: false}} name='PaymentFailure' component={PaymentFailure} />
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='PaymentForm' component={PaymentForm} />
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='DeliveryAddress' component={DeliveryAddress} />
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='ShippingAddress' component={ShippingAddress} />
			<Stack.Screen options={{headerShown: false}} name='Preview' component={Preview} />
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='ExhibitionDetails' component={ExhibitionDetails} />
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='UserProfile' component={UserProfile} />
			<Stack.Screen options={{headerShown: false}} name='Map' component={Map} /> 
			<Stack.Screen options={{headerShown: false}} name='Exhibition' component={Exhibition} /> 
          </>
          :
          <>
            <Stack.Screen options={{headerShown: false}} name='Splash' component={Splash} />
            <Stack.Screen options={{headerShown: false}} name='Onboarding' component={Onboarding} />
            <Stack.Screen options={{headerShown: false}} name='SignUp' component={SignUp} />
          </>
        }
        <Stack.Screen options={{headerShown: false}} name='SignIn' component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast config={toastConfig} />
    </>
  )
}
export default App;