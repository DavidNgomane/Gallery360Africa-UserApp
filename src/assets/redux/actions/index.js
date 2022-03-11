import { USER_FOLLOWING_STATE_CHANGE, USERS_LIKES_STATE_CHANGE } from "../constants";
import firestore from "@react-native-firebase/firestore";

export function reload() {
    return ((dispatch) => {
        dispatch(fetchUserFollowing())
        dispatch(fetchLikes())

    })
}

export function fetchUserFollowing() {
    return ((dispatch) => {
        const listener = firestore().collection("following").doc(ImageUid).
    })
}

export function fetchLikes(likes, imageUID) {
    return ((dispatch) => {
        const likes = firestore().collection("Market").where()
    })
}

