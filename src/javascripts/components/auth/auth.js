import './auth.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import icon from './googCircleIcon.png';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const printLoginBtn = () => {
  const btnString = `<button id='googleLogin' class='btn btn-light'>
      <img id='goog' src=${icon} />
      <span class='login'> Login with Google</span>
    </button>
  `;
  utilities.printToDom('auth', btnString);
  $('#googleLogin').click(signMeIn);
};

export default { printLoginBtn };
