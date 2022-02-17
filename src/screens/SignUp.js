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

const SignUp = ({navigation}) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    if (fullName !== "" && email !== ""  && password !== ""){
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        firestore().collection('users').doc(user.uid).set({
                        uid: user.uid,
                        fullName: fullName,
                        email: user.email,
                    }).then(() => {
                      alert("You are successfully registered");
                      navigation.navigate("SignIn");
                    }).catch((error) => alert(error));
       // console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
           alert('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
           alert('That email address is invalid!');
        }
    
        console.error(error);
      });
    }
  }

  const signinValidation = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    fullName: Yup.string().required('Full name is required').min(4, ({min}) => `Full name must be a minimum of ${min} characters`),
  });

  return (
    <Formik
       initialValues={{ fullName: '', email: '', password: ''}}
       onSubmit={values => console.log(values)}
       validationSchema={signinValidation}
       validateOnMount={true}
     >  
    {({ handleChange, handleBlur, handleSubmit, setFieldTouched ,values, touched, errors, isValid, isInitialValid }) => (
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
          <Text style={{color: '#ffffff'}}>Create your new account</Text>
      </View>
   </View>   

    <View style={{flex: 1}}>   
         
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={fullName => setFullName(fullName)}
              // onChangeText={handleChange("fullName")}
              onBlur={() => setFieldTouched('fullName')}
              value={fullName}
              underlineColorAndroid="#f000"
              placeholder="Full Name"
              placeholderTextColor="#ffffff"
              autoCapitalize="sentences"
            />
          </View>
          {/* {(errors.fullName && touched.fullName) && 
             <Text style={styles.errors}>{errors.fullName}</Text>
          } */}

          <View style={styles.SectionStyle}>
            <TextInput
              style={[styles.inputStyle, 
                //  {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#fff' : 'red'}
              ]}
              onChangeText={email => setEmail(email)}
              // onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched('email')}
              value={email}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              keyboardType="email-address"
              textContentType='emailAddress'
            />
          </View>
          {/* {(errors.email && touched.email) && 
             <Text style={styles.errors}>{errors.email}</Text>
          } */}

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={password => setPassword(password)}
              // onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched('password')}
              value={password}
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#ffffff"
              returnKeyType="next"
              secureTextEntry={true}
              textContentType="password"
            />
          </View>
          {/* {(errors.password && touched.password) && 
            <Text style={styles.errors}>{errors.password}</Text>
          }
      */}
          <TouchableOpacity
            onPress={register}
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
     )}  
     </Formik>
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
