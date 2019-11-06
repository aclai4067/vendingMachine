import axios from 'axios';
import apiKeys from '../apiKeys.json';
// import snack from '../../components/snack/snack.js';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSnacksByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demSnacks = response.data;
      const snacks = [];
      Object.keys(demSnacks).forEach((fbId) => {
        demSnacks[fbId].id = fbId;
        snacks.push(demSnacks[fbId]);
      });
      resolve(snacks);
    }).catch((error) => reject(error));
});

const saveNewSnack = (newSnack) => axios.post(`${baseUrl}/snacks.json`, newSnack);

const changeSnack = (snackId, updatedSnack) => axios.put(`${baseUrl}/snacks/${snackId}.json`, updatedSnack);

const restock = (snackId, restockNum) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks/${snackId}.json`)
    .then((result) => {
      const snackObj = result.data;
      snackObj.currentStocked += restockNum;
      snackObj.lifetimeNum += restockNum;
      changeSnack(snackId, snackObj);
      resolve();
    }).catch((err) => reject(err));
});

export default { getSnacksByUid, saveNewSnack, restock };
