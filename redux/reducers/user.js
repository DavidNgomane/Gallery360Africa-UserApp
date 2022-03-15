export const USER_FOLLOWING_STATE_CHANGE = 'USER_FOLLOWING_STATE_CHANGE'

const initialState = {
    currentUser: null,
    following: []
}

export const user = (state = initialState, action) = > {
    switch (action.type) {
        case USER_FOLLOWING_STATE_CHANGE:
            return {
                ...state,
                following: action.following
            }
    }
}
   