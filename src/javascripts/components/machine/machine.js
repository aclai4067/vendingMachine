import './machine.scss';
import smash from '../../helpers/data/smash';
// import utilities from '../../helpers/utilities';

const buildMachine = () => {
  //  get machine - returns machine1
  smash.getCompleteMachine()
    .then((singleMachine) => {
      console.log('machine1', singleMachine);
    }).catch((err) => console.error(err));
  //  use machineId to get all positions for that machine
  //  use machineId to get all snackPositions
  //  use uid of snack positions/positions to get snacks
  //  smash - return an array of positions (in order A1, A2, A3, B1...)
  //  so positions should have position.snack if a snack exists that that position

  // const machineString = '',
  // utilities.printToDom('machine', machineString);
};

export default { buildMachine };
