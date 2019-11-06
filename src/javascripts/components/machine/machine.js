import './machine.scss';
import $ from 'jquery';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import snack from '../snack/snack';
import snackData from '../../helpers/data/snackData';

const buySnack = (e) => {
  e.stopImmediatePropagation();
  const snackId = e.target.id.split('buy-')[1];
  snackData.purchaseSnack(snackId)
    // eslint-disable-next-line no-use-before-define
    .then(() => buildMachine())
    .catch((err) => console.error(err));
};

const buildMachine = () => {
  //  get machine - returns machine1
  smash.getCompleteMachine()
    .then((singleMachine) => {
      let machineString = `
        <h2 class='text-center'>VENDING MACHINE</h2>
        <div id='snack-section' class='d-flex flex-wrap'>
        `;
      singleMachine.forEach((position) => {
        machineString += snack.makeSnack(position);
      });
      machineString += '</div>';
      utilities.printToDom('machine', machineString);
      $('#machine').on('click', '.buySnack', buySnack);
    }).catch((err) => console.error(err));
};

export default { buildMachine };
