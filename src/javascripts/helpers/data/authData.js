import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const authDiv = $('#auth');
const stockDiv = $('#stock');
const logoutBtn = $('#logoutBtn');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      stockDiv.removeClass('hide');
      logoutBtn.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      stockDiv.addClass('hide');
      logoutBtn.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
