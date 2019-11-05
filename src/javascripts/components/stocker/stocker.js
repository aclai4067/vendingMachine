import './stocker.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import stockCard from '../stockCard/stockCard';

const buildStocker = (uid) => {
  smash.getSnacksWithPoitions(uid)
    .then((snacks) => {
      let stockString = `
        <h2>STOCK THE MACHINE</h2>
        <div class='row d-flex- flex-wrap text-center mb-2'>
      `;
      snacks.forEach((snack) => {
        stockString += stockCard.makeSnack(snack);
      });
      stockString += '</div>';
      utilities.printToDom('stock', stockString);
    })
    .catch((err) => console.error(err));
};

export default { buildStocker };
