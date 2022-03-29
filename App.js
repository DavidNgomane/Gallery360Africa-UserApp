import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Styles
import { globalStyles } from './src/assets/styles/GlobalStyles';

// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
import UserSettings from './src/screens/UserSettings';
import Search from './src/screens/Search';
import Notifications from './src/screens/Notifications';
import TermsAndCondtions from './src/screens/TermsAndConditions';
import Artists from './src/screens/Artists';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  
  return (
    <Tab.Navigator
    tabBarOptions={{
      tabStyle: {
        height: 45,
        minHeight: 0,
        backgroundColor: '#ceb89e',
        borderRadius: 20,
        margin: 10,
        marginVertical: 10,
        padding: 3,
        width: 160,
        marginLeft:  10,
        //headerTransparent: true,
      },
      renderIndicator: () => null,
    }}
    screenOptions={{
      headerTransparent: true,
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#000',
      swipeEnabled: false,
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

  const [items, SetItems] = useState(0);
  const [image, setImage] = useState("");

  const getCartItemNumber = () => {
    const uuid = auth()?.currentUser?.uid;
  
    return firestore().collection("cartItem").doc(uuid).onSnapshot((snapShot1) => {
      const getData = snapShot1.ref.collection("items").where("uuid", "==", uuid).onSnapshot((snapShot) => {
      const cartItems = snapShot.size; 
      // console.log(cartItems + "  this the number of item added to cart")
      SetItems(cartItems);
    })
  })
  }


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
            
                return firestore().collection("cartItem").doc(userExist.uid).onSnapshot((snapShot1) => {
                  const getData = snapShot1.ref.collection("items").where("uuid", "==", userExist.uid).onSnapshot((snapShot) => {
                  const cartItems = snapShot.size;
                  // console.log(cartItems + "  this the number of item added to cart")
                  setCartItem(cartItems);
                })
              })
            
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
    getCartItemNumber();
    return () => getCartItemNumber();
  },[])

const uuid = auth()?.currentUser?.uid;
  
  return (
    <>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'
        
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#000',
          },
        }}>

        {user?
           <>
       <Stack.Screen 
          name='Home' 
          component={TabNavigator}
          options={({navigation}) => ({

              headerTitleAlign: 'left', 
              headerTitleStyle: {
                color: '#ceb89e'
              },
            
            headerBackVisible: false,
            headerShadowVisible: false,
            
            title: `${fullName}`,
            headerRight: () => (
              <View style={{flexDirection: 'row', width: 95, justifyContent: 'space-between'}}>

                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                  <Ionicons 
                    name='search' size={30} 
                    color={'#ceb89e'}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cart', {cartItem: cartItem, uuid: uuid})}>
                  <MaterialIcons 
                    name='shopping-cart' size={30} 
                    color={'#ceb89e'}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('UserProfile', {photoURL: User, fullName: fullName, uuid: uuid, cartItem: cartItem})}>
                  <Image 
                    source={{uri: `${User}`}} 
                    style={{width: 30, height:30, borderRadius:30, backgroundColor:"lightgrey" }}
                  />
                </TouchableOpacity>
              </View>
            )       
          })}
          
        />
        
			<Stack.Screen options={{headerShown: true,  headerTransparent: true,  navigationOptions: {
      title: 'Flashcards',
      headerBackTitleStyle: {
       color: '#000'
      }
    },}} name='ArtistProfile' component={ArtistProfile}/>
    
    <Stack.Screen options={({ navigation, headerTransparent }) => ({
              headerTransparent: true, headerTintColor: '#fff', headerTitleStyle: '#fff',
              headerRight: () => (
                <TouchableOpacity
                onPress={() => navigation.navigate('Cart', {cartItem: items, uuid: uuid}, console.log(uuid))}
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
                  <MaterialCommunityIcons
                    name="cart"
                    size={28}
                    color={'#FFFFFF'}
                    style={{alignSelf: 'center', marginVertical:10}}
                  />
  
          </View>
              </TouchableOpacity>
              ),
            })} name="ArtPreview" component={ArtPreview} />

			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='Cart' component={Cart} />
			<Stack.Screen options={{headerShown: false}} name='PaymentSuccesful' component={PaymentSuccesful} />
			<Stack.Screen options={{headerShown: false}} name='PaymentFailure' component={PaymentFailure} />
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='PaymentForm' component={PaymentForm} />
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='DeliveryAddress' component={DeliveryAddress} />
			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='ShippingAddress' component={ShippingAddress} />
			<Stack.Screen options={{headerShown: true, headerTransparent: true, headerTitle: '2'}} name='Preview' component={Preview} />
			<Stack.Screen options={{headerShown: true, headerTransparent: true}} name='Search' component={Search} />
			<Stack.Screen options={{headerShown: true, headerTransparent: true}} name='Notifications' component={Notifications} />
			<Stack.Screen options={{headerShown: true, headerTransparent: true}} name='TermsAndConditions' component={TermsAndCondtions} />
			<Stack.Screen options={{headerShown: true, headerTransparent: true}} name='Artists' component={Artists} />
			
      <Stack.Screen 
        options={{
          headerShown: true,  
          headerTransparent: true, 
          headerTitleStyle: {
            color: '#fff'
          },
          headerBackTitleStyle: {
            color: '#fff'
          },
        }} 
        name='ExhibitionDetails' 
        component={ExhibitionDetails} 
      />

			<Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='UserProfile' component={UserProfile} />
			<Stack.Screen options={{headerShown: false}} name='Map' component={Map} /> 
			<Stack.Screen options={{headerShown: false}} name='Exhibition' component={Exhibition} /> 
      <Stack.Screen options={{headerShown: true,  headerTransparent: true, title: 'Settings'}} name='UserSettings' component={UserSettings} />
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