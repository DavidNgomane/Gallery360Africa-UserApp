import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
<<<<<<< Updated upstream
import { db } from '../assets/database/Firebase';
=======
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { StripeProvider } from '@stripe/stripe-react-native';

// Styles
import { globalStyles } from './src/assets/styles/GlobalStyles';

>>>>>>> Stashed changes
// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

// Import screens
import Market from './src/screens/Market';
import Exhibition from './src/screens/Exhibition';
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
<<<<<<< Updated upstream
import ExhibitionDetails from './src/screens/ExhibitionDetails';
=======
import Map from './src/screens/Map';
import UserSettings from './src/screens/UserSettings';
import Search from './src/screens/Search';
import CardInformation from './src/screens/CardInformation';
import Notifications from './src/screens/Notifications';
import TermsAndCondtions from './src/screens/TermsAndConditions';
import Artists from './src/screens/Artists';
>>>>>>> Stashed changes

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
          backgroundColor: '#ceb89e',
          headerShadowVisible: false,
          margin: 5
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#fff',
        tabBarPressColor: '#000',
      }}
    >
      <Tab.Screen name='Market' component={Market} />
      <Tab.Screen name='Exhibition' component={Exhibition} />
    </Tab.Navigator>
  )
}
<<<<<<< Updated upstream
=======
const App = ({navigation}) => {

  const [publishableKey, setPublishableKey] = useState('');
  
  


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

>>>>>>> Stashed changes

const App = () => {

  // const [photo, setPhoto] = useState(null);

  // const getPhoto = () => {
  //   return db.collection('artists').onSnapshot((snapShot) => {
  //     const allPhotos = snapShot.docs.map(docSnap => docSnap.data());
  //     setPhoto(allPhotos);
  //   })
  // }
  // useEffect(() => {
  //   getPhoto();
  // }, [])

  return (
<<<<<<< Updated upstream
    <NavigationContainer>
=======
    <>
    <StripeProvider publishableKey={publishableKey}>
      <NavigationContainer>
>>>>>>> Stashed changes
      <Stack.Navigator
        initialRouteName='Splash'
      >
        <Stack.Screen options={{headerShown: false}} name='Splash' component={Splash} />
        <Stack.Screen options={{headerShown: false}} name='Onboarding' component={Onboarding} />
        <Stack.Screen 
          name='Home' 
          component={TabNavigator}
          options={({navigation}) => ({
            // headerLeft: () => {return null;},
            // headerBackVisible: false,
            title: 'Hi Sibusiso',
            headerRight: () => (
              <View style={{flexDirection: 'row', width: 74, justifyContent: 'space-between', }}>
                {/* <TouchableOpacity style={{borderWidth: 1, borderRadius: 20, borderColor: '#fff', width: 50, height: 50, alignItems: 'center', paddingTop: 12, }}>
                  <MaterialIcons name='shopping-cart' size={24} color={'white'}/>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <MaterialIcons name='shopping-cart' size={29} color={'#000'}/>
                </TouchableOpacity>

                <TouchableOpacity>
                  <EvilIcons name='user' size={39} color={'#000'} />
                </TouchableOpacity>
              </View>
            )       
          })}
          
        />
<<<<<<< Updated upstream
        <Stack.Screen options={{headerShown: false}} name='ArtistProfile' component={ArtistProfile}/>
=======
        
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
      <Stack.Screen options={{headerSgown: false}} name="CardInformation" component={CardInformation}/>
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
        
>>>>>>> Stashed changes
        <Stack.Screen options={{headerShown: false}} name='SignIn' component={SignIn} />
        <Stack.Screen options={{headerShown: false}} name="ArtPreview" component={ArtPreview} />
        <Stack.Screen options={{headerShown: false}} name='Cart' component={Cart} />
        <Stack.Screen options={{headerShown: false}} name='PaymentSuccesful' component={PaymentSuccesful} />
        <Stack.Screen options={{headerShown: false}} name='PaymentFailure' component={PaymentFailure} />
        <Stack.Screen options={{headerShown: false}} name='SignUp' component={SignUp} />
        <Stack.Screen options={{headerShown: false}} name='PaymentForm' component={PaymentForm} />
        <Stack.Screen options={{headerShown: false}} name='DeliveryAddress' component={DeliveryAddress} />
        <Stack.Screen options={{headerShown: false}} name='ShippingAddress' component={ShippingAddress} />
        <Stack.Screen options={{headerShown: false}} name='Preview' component={Preview} />
        <Stack.Screen options={{headerShown: false}} name='ExhibitionDetails' component={ExhibitionDetails} />
        {/* <Stack.Screen options={{headerShown: false}} name='UserProfile' component={UserProfile} /> */}
      </Stack.Navigator>
    </NavigationContainer>
<<<<<<< Updated upstream
=======
    <Toast config={toastConfig} />
    </StripeProvider>
    </>
>>>>>>> Stashed changes
  )
}

export default App;