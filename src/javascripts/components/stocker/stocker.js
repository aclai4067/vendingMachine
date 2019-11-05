import './stocker.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import snackPositionsData from '../../helpers/data/snackPositionData';
import stockCard from '../stockCard/stockCard';
import machine from '../machine/machine';

const deleteFromMachine = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  snackPositionsData.deleteSnackPosition(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildStocker(uid);
      machine.buildMachine();
    })
    .catch((err) => console.log(err));
};

const addToMachine = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const positionInput = $(e.target).siblings().val();
  smash.getAvailablePositions()
    .then((positions) => {
      const selectedPosition = positions.find((x) => x.position.toLowerCase() === positionInput.toLowerCase());
      if (selectedPosition) {
        const newSnackPos = {
          positionId: selectedPosition.id,
          snackId: e.target.id,
          machineId: selectedPosition.machineId,
          uid,
        };
        snackPositionsData.createSnackPosition(newSnackPos).then(() => {
          // eslint-disable-next-line no-use-before-define
          buildStocker(uid);
          machine.buildMachine();
        });
      }
    })
    .catch((err) => console.error(err));
};

const buildStocker = (uid) => {
  smash.getSnacksWithPoitions(uid)
    .then((snacks) => {
      let stockString = `
        <h2>STOCK THE MACHINE</h2>
        <div class='row d-flex- flex-wrap mb-2'>
      `;
      snacks.forEach((snack) => {
        stockString += stockCard.makeSnack(snack);
      });
      stockString += '</div>';
      utilities.printToDom('stock', stockString);
      $('#stock').on('click', '.deleteSnackPosition', deleteFromMachine);
      $('#stock').on('click', '.addSnackPosition', addToMachine);
    })
    .catch((err) => console.error(err));
};

export default { buildStocker };
