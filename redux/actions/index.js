import firestore from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/auth';
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE } from '../constants/index';


export function fetchUseFollowing() {
    return ((dispatch) => {
        firestore()
        .collection('following')
        .doc(auth().currentUser.uid)
        .collection('userFollowing')
        .onSnapshot((snapshot) => {
            let following = snapshot.docs.map(doc => {
                const id = doc.id;
                return id
            })
            dispatch({type: USER_FOLLOWING_STATE_CHANGE, following})
        })
    })
}