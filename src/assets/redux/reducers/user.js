import { USER_FOLLOWING_STATE_CHANGE, USER, USERS_LIKES_STATE_CHANGE } from "../constants";

const initialState = {
    following : [],
    feed: [],

}

export const user = (state = initialState, action) => {

    switch (action.type) {
        // case USERS_LIKES_STATE_CHANGE :
        //     return {
        //         ...state, feed: state.feed.map((post) => post.id == action.postId ? )
        //     }
        case USER_FOLLOWING_STATE_CHANGE:
              return {
                ...state,
                following: action.following
            }
            
            default:
            return state;
    } 
}