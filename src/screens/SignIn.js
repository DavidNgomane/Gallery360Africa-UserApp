import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import { globalStyles } from '../assets/styles/GlobalStyles';
import Home from './Home';

const SignIn = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState("");

  const signIn = () => {
       if(email !== "" && password !== "") {
         auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        alert('User logged-in successfully!')
        const userCredential = user.user;
        // If server response message same as Data Matched
        if (user) navigation.replace("Home", { userUid: userCredential.uid, uUID: user.user.uid });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email")
        alert("Email is not valid");
        else if (error.code === "auth/user-not-found")
           alert("No User Found");
        else {
          alert(
            "Please check your email id or password"
          );
        }
      });
       }
    }

    let signInValidation = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  });

  return (
    <>  
    <Formik
       initialValues={{ email: '', password: ''}}
       onSubmit={(values) => console.log(values)}
       validationSchema={signInValidation}
       validateOnMount={true}
     >  
    {({ handleChange, handleBlur, handleSubmit, setFieldTouched, onBlur, values, touched, errors, isValid, isInitialValid }) => (
          
    <KeyboardAvoidingView behavior='position'>
    <ImageBackground
      source={require('../assets/images/signIn/bg.png')}
      style={styles.imageBack}
    >
    <View style={{flex: 1}}>
    <View style={styles.gallery360logo}>
      <Image source={require('../assets/images/signIn/SignInLogo.png')}/>
      </View>
    </View>   

      <View style={{flex: 1, marginBottom: 18}}>
        <View>
              <View  style={{marginLeft: 33, marginBottom: 15}}>
                  <Text style={{fontSize: 36, color: '#22180E'}}>Welcome Back !</Text>
                  <Text style={{color: '#ffffff'}}>Login to your account</Text>
              </View>
        </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle} 
              onChangeText={email => setEmail(email)}
              // onChangeText={handleChange("email")}
              // onBlur={handleBlur("email")}
              onBlur={() => setFieldTouched('email')}
              value={email}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              keyboardType="email-address"
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
              // onBlur={handleBlur("password")}
              onBlur={() => setFieldTouched('password')}
              value={password}
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#ffffff"
              returnKeyType="next"
              secureTextEntry={true}
            />
          </View>
          {/* {(errors.password && touched.password) && 
             <Text style={styles.errors}>{errors.password}</Text>
          } */}
                 
          <TouchableOpacity
            onPress={signIn}
            activeOpacity={0.5}>
           <LinearGradient start={{x: 1, y: 0}} end={{x: 1, y: 1}} colors={['#0E1822', '#181818']} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
  
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
           <Text style={{}}>
              Don't have an account?
           </Text>
           <Text>
           <TouchableOpacity onPress={() => navigation.navigate('SignUp', {  })}>
                <Text style={{color: '#22180E'}}>
                  {' '}
                  Sign Up
                </Text>
              </TouchableOpacity>
           </Text>
        </View>
        </View>
    </ImageBackground>
    </KeyboardAvoidingView> 
    )}  
    </Formik>
    </>
  );
};

const bg = require('../assets/images/signIn/bg.png')

export default SignIn;

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
      marginTop: 45,    
  },

  errors: {
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
    marginHorizontal: 35
  }
});
