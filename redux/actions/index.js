import { USER_FOLLOWING_STATE_CHANGE } from '../constants/index'


export function fetchUserFollowing( {
    return ((dispatch) => {
        firestore()
        .collection("following")
        .doc(auth().currentUser.uid)
        .collection("userFollowing")
        .onSnapshot((snapshot) => {
            let following = snapshot.docs.map(doc => {
                const id = doc.id;
                return id
            })
            dispatch ({ type: USER_FOLLOWING_STATE})
        })
    })
})