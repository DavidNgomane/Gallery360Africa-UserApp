import React, {useEffect, useState} from 'react';
import firestore from "@react-native-firebase/firestore";
import { View, Text } from 'react-native';

export default function CommentNumber({ImageUid}) {

    const [commentNumber, setCommentNumber] = useState(0);

//     const getComentsNumber = async (ImageUid) => {
//         await 
//   }

  useEffect(() => {

  const getComentsNumber = firestore().collection("comments").where("ImageUid", "==", ImageUid).onSnapshot((snapShot) => {
        const commentNumbers = snapShot.size;
        console.log(commentNumbers, "ubable to get number of coomments");
        setCommentNumber(commentNumbers);
    })

  return () => getComentsNumber;  
}, [ImageUid]); 
           
        return(
            <View>
                    {commentNumber > 0 ? (
                    <Text style={{color: '#FFFFFF'}}>{commentNumber}</Text>):(<View></View>)
                    }
            </View>
        )
}
