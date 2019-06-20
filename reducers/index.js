import { combineReducers } from 'redux';

const CheckLoginReducer = (state, action = 'FETCHING') => {
  switch( action.type ){
    case 'FETCHING':
      return {status: 'Loading'};
    case 'FETCH':
      return {status: 'Login', uid: action.payload};
    case 'FETCH_ERROR':
      return {status: 'Unlogin'};
    default: 
      return {status: 'Loading'};  
  }
}

export default combineReducers({
  CheckLoginReducer: CheckLoginReducer,
})