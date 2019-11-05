import './stockCard.scss';

const makeSnack = (snack) => {
  const snackString = `
  <div class='card col-3 snackCard'>
  <div class='card-body'>
    <h3>${snack.name}</h3>
    <p>$${(snack.price / 100).toFixed(2)}</p>
  </div>
  <div>
    <button id='${snack.snackPosId}' class='btn btn-outline-danger deleteSnackPosition mb-2'>Remove from ${snack.position.position}</p>
  </div>
  </div>
  `;
  return snackString;
};

export default { makeSnack };
