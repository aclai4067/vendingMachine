import './stocker.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import snackPositionsData from '../../helpers/data/snackPositionData';
import stockCard from '../stockCard/stockCard';
import machine from '../machine/machine';
import snackData from '../../helpers/data/snackData';

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

const addNewSnack = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newSnack = {
    imgUrl: $('#snack-image-url').val(),
    name: $('#snack-name').val(),
    price: $('#snack-price').val() * 1,
    currentStocked: 0,
    lifetimeNum: 0,
    uid,
  };
  snackData.saveNewSnack(newSnack)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildStocker(uid);
    }).catch((err) => console.error(err));
};

const quickStock = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const snackId = e.target.id.split('snack-')[1];
  snackData.restock(snackId, 5)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      buildStocker(uid);
      machine.buildMachine();
    }).catch((err) => console.error(err));
};

const buildStocker = (uid) => {
  smash.getSnacksWithPoitions(uid)
    .then((snacks) => {
      let stockString = `
        <h2>STOCK THE MACHINE</h2>
        <button type="button" class="btn btn-outline-light" data-toggle="modal" data-target="#exampleModal">
          Add Snack
        </button>
        <div class='row d-flex- flex-wrap mb-2'>
      `;
      snacks.forEach((snack) => {
        stockString += stockCard.makeSnack(snack);
      });
      stockString += '</div>';
      utilities.printToDom('stock', stockString);
      $('#stock').on('click', '.deleteSnackPosition', deleteFromMachine);
      $('#stock').on('click', '.addSnackPosition', addToMachine);
      $('#stock').on('click', '.quick-stock', quickStock);
      $('#add-new-snack').click(addNewSnack);
    })
    .catch((err) => console.error(err));
};

export default { buildStocker };
