import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllSnackPositionsByMachineId = (machId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snackPositions.json?orderBy="machineId"&equalTo="${machId}"`)
    .then((response) => {
      const demSnackPos = response.data;
      const snackPositions = [];
      Object.keys(demSnackPos).forEach((fbId) => {
        demSnackPos[fbId].id = fbId;
        snackPositions.push(demSnackPos[fbId]);
      });
      resolve(snackPositions);
    }).catch((error) => reject(error));
});

export default { getAllSnackPositionsByMachineId };
