import * as firebase from "firebase";

const Fetching = () => {
  return {
    type: 'FETCHING'
  }
}
const Fetch= (res) => {
  return {
    type: 'FETCH',
    payload: res
  }
}
const FetchError = () => {
  return {
    type: 'FETCH_ERROR'
  }
}

export const LoginCheck = () => (dispatch) => {
  dispatch(Fetching());
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(Fetch(user.uid));
    } else {
      dispatch(FetchError());
    }
  });
}