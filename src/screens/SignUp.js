import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { globalStyles } from '../assets/styles/GlobalStyles';
//
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
const SignUp = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validate = () => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fullName == "" && email == "" && password == "") {
      Toast.show({
         type: 'error',
         text1: 'Hello user',
         text2: 'Both fields are empty',
      })
    } else  if (fullName == "") {
      Toast.show({
        type: 'error',
        text1: 'Hello user',
        text2: 'Full name cannot be empty',
     })
   } else  if (!reg.test(email)) {
    Toast.show({
      type: 'error',
      text1: 'Hello user',
      text2: 'Email is not valid',
   })
  }
    else if (password == "") {
     Toast.show({
        type: 'error',
        text1: 'Hello user',
        text2: 'Password cannot be empty',
     })
   }
 }
  const register = async () => {
    if (fullName !== "" && email !== "" && password !== ""){
      await auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        firestore().collection('users').doc(user.uid).set({
                        uid: user.uid,
                        fullName: fullName,
                        email: user.email,
                        photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCTa1o13qHi0hBEUMcOCKQhrrNSr8pSUmAoA&usqp=CAU"
                    }).then(() => {
                      Toast.show({
                        type: 'success',
                        text1: 'Hello user',
                        text2: 'You have successfully registered ',
                     })
                      navigation.navigate("SignIn");
                    }).catch((error) => alert(error));
       // console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
           Toast.show({
            type: 'error',
            text1: 'Hello user',
            text2: 'That email address is already in use!',
         })
        }
        if (error.code === 'auth/invalid-email') {
           Toast.show({
            type: 'error',
            text1: 'Hello user',
            text2: 'That email address is invalid!',
         })
        } else {
           register()
        }
        console.error(error);
      });
    }
  }
  return (
    <>
  <KeyboardAvoidingView behavior='position' >
  <ImageBackground
    style={{flex: 1}}
      source={require('../assets/images/signUp/signUp.png')}
      style={styles.imageBack}
  >
 <View style={{flex: 1}}>
 <View style={styles.gallery360logo}>
    <Image source={require('../assets/images/signUp/signUpLogo.png')}
    />
    </View>
     <View  style={{marginLeft: 33, marginTop: 10}}>
          <Text style={{fontSize: 36, color: '#22180E'}}>Sign Up</Text>
          <Text style={{color: '#FFFFFF'}}>Create your new account</Text>
      </View>
   </View>
    <View style={{flex: 1}}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={fullName => setFullName(fullName)}
              value={fullName}
              underlineColorAndroid="#f000"
              placeholder="Full Name"
              placeholderTextColor="#FFFFFF"
              autoCapitalize="sentences"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={[styles.inputStyle,
                //  {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#fff' : 'red'}
              ]}
              onChangeText={email => setEmail(email)}
              value={email}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#FFFFFF"
              keyboardType="email-address"
              textContentType='emailAddress'
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={password => setPassword(password)}
              value={password}
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#FFFFFF"
              returnKeyType="next"
              secureTextEntry={true}
              textContentType="password"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              validate()
            }}
            style={styles.buttonStyle}
            activeOpacity={0.5}>
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
           <Text style={{}}>
              Already have an account?
           </Text>
           <Text>
           <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={{color: '#22180E'}}>
                  {' '}
                  Sign In
                </Text>
              </TouchableOpacity>
           </Text>
        </View>
    </View>
    </ImageBackground>
    </KeyboardAvoidingView>
     </>
  );
}
export default SignUp;
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 17,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#0E1822',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
    borderRadius: 14,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 13,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFFFFF',
  },
  imageBack: {
    height: Dimensions.get('window').height / 1,
  },
  gallery360logo: {
      height: 226,
      width: 166,
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: 30,
  },
  errors: {
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
    marginHorizontal: 35
  }
});