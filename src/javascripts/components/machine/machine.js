import './machine.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import snack from '../snack/snack';

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
      console.log('machine1', singleMachine);
    }).catch((err) => console.error(err));
};

export default { buildMachine };
