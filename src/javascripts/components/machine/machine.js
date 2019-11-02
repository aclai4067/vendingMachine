import './machine.scss';
import smash from '../../helpers/data/smash';

const buildMachine = () => {
  //  get machine - returns machine1
  smash.getCompleteMachine()
    .then((singleMachine) => {
      console.log('machine1', singleMachine);
    }).catch((err) => console.error(err));
};

export default { buildMachine };
