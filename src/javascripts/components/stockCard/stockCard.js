import './stockCard.scss';

const makeSnack = (snack) => {
  const snackString = `
  <div class='card col-3 snackCard'>
  <h3>${snack.name}</h3>
  <p>$${(snack.price / 100).toFixed(2)}</p>
  <p>${snack.position.position}<p>
  </div>
  `;
  return snackString;
};

export default { makeSnack };
