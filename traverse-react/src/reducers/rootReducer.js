import { LOG_IN, LOG_OUT} from '../actions/actionCreators'

const initialState = {
    logged: false
}

export default function rootReducer(state=initialState, action){
    switch (action.type) {
        case LOG_IN:
            return {
                logged: true,
                username: action.username
            }
        case LOG_OUT:
            return {
                logged: false
            }
        default:
            return state
    }
}