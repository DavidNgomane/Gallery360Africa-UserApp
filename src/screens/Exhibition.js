import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../assets/styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';

// 
const artistsData = [
      {
        id: 1,
        name: 'David',
        image: 'https://images.unsplash.com/photo-1534491089148-7a0f3dc3c20e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 2,
        name: 'Nkosinathi',
        image: 'https://images.unsplash.com/photo-1621905252472-943afaa20e20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 3,
        name: 'Jason',
        image: 'https://images.unsplash.com/photo-1518882570151-157128e78fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 4,
        name: 'Lernard',
        image: 'https://images.unsplash.com/photo-1534493872551-856c2bb2279f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 5,
        name: 'Seate',
        image: 'https://images.unsplash.com/photo-1586232880922-25f9b9695ecb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 6,
        name: 'Gift',
        image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 7,
        name: 'Kamogelo',
        image: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
    ]

const Exhibition = ({navigation, route}) => {

  // 
  const [exhibition, setExhibition] = useState(null);
  const getExhibition = () => {
    return firestore().collection('exhibition').onSnapshot((snapShot) => {
      const allExhibitions = snapShot.docs.map(docSnap => docSnap.data());
      setExhibition(allExhibitions);
    })
  }
  useEffect(() => {
    getExhibition();
  }, [])

  // 

  return (
    <View style={globalStyles.container}>
      {/*  */}
      <View style={globalStyles.homeBody}>
        <View style={globalStyles.artContainer}>
          <FlatList
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            data={exhibition}
            keyExtractor={item => `${item.artistUid}`}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('', {artistUid: item.artistUid})}>
                    <Image 
                      source={{uri: item.exhibitionImage}} 
                      style={globalStyles.artImage}
                    />
                    <View style={globalStyles.artTxtBg}>
                      <Text style={globalStyles.artNameTxt}>Hello</Text>
                      <View>
                        <Text style={globalStyles.artTypeTxt}>World</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>

        {/*  */}
        <View style={globalStyles.homeFooter}>
            <FlatList
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              data={artistsData}
              keyExtractor={item => `${item.id}`}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile')}>
                    <View style={{paddingHorizontal: 10}}>
                      <Image 
                        source={{uri: item.image}} 
                        style={globalStyles.artistImage}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
        </View>
    </View>
  );
};

export default Exhibition;
