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

const deleteSnackPosition = (snackPosId) => axios.delete(`${baseUrl}/snackPositions/${snackPosId}.json`);

const createSnackPosition = (newSnackPos) => axios.post(`${baseUrl}/snackPositions.json`, newSnackPos);

export default { getAllSnackPositionsByMachineId, deleteSnackPosition, createSnackPosition };
