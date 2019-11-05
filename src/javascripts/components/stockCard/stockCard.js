import './stockCard.scss';

const makeSnack = (snack) => {
  let snackString = `
  <div class='card col-3 snackCard'>
  <div class='card-body'>
    <h3>${snack.name}</h3>
    <p>$${(snack.price / 100).toFixed(2)}</p>
  </div>
  <div>`;
  if (snack.snackPosId !== '') {
    snackString += `
      <button id='${snack.snackPosId}' class='btn btn-outline-danger deleteSnackPosition mb-2'>Remove from ${snack.position.position}</p>
    `;
  } else {
    snackString += `
      <input type='text' placeholder='A1' />
      <button id='${snack.id}' class='btn btn-outline-success addSnackPosition mb-2'>Add to Machine</p>
    `;
  }
  snackString += '</div></div>';
  return snackString;
};

export default { makeSnack };
