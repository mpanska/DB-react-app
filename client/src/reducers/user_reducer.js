import{
    LOGIN_USER
}from '../actions/types';


export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return{ ...state, loginSuccess: action.payload} // ... means we get everything from the state
        default:
            return state; //if we can't find any type
    }
}