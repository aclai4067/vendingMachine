import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import nav from './components/myNav/myNav';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.printLoginBtn();
  authData.checkLoginStatus();
  nav.logoutEvent();
  console.log('it works', firebase.apps);
};

init();
