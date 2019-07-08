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

const FetchTaskList = (res) => {
  return {
    type: 'FETCHTASKLIST',
    payload: res
  }
} 

export const TaskList = (uid) => (dispatch) => {
  return firebase.database().ref(`users/${uid}`)
  .on("value", snap => {
    if (snap.val() !==  null){
      dispatch(FetchTaskList(snap.val()));
    } else {
      dispatch(FetchTaskList(''));
    }
  })
}