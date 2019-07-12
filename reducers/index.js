import { combineReducers } from 'redux';

const CheckLoginReducer = (UserInit = {status: 'Loading', uid: '', list: ''}, action = 'FETCHING') => {
  switch( action.type ){
    case 'FETCHING':
      return UserInit;
    case 'FETCH':
      return {...UserInit, status: 'Login and Fetch', uid: action.payload};
    case 'FETCH_ERROR':
      return {...UserInit, status: 'Unlogin'};
    case 'FETCHTASKLIST':
      return {...UserInit, status: 'Login', list: action.payload};
    default: 
      return UserInit;  
  }
}

export default combineReducers({
  CheckLoginReducer: CheckLoginReducer,
})