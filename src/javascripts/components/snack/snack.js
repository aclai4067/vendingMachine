const makeSnack = (position) => {
  const item = position.snack;
  let snackString = '';
  if (item.name) {
    snackString += `
      <div class='card col-4 text-center d-flex flex-column justify-content-between'>
        <h3>${item.name}</h3>
        <img class='card-img' src='${item.imgUrl}' />
        <div class='card-body'>
          <p>$${(item.price / 100).toFixed(2)}</p>
          <p>${item.currentStocked} available</p>
        </div>
        <div>
          <button id='buy-${item.id}' class='btn btn-info buySnack ${item.currentStocked < 1 ? 'disabled' : ''}'>${position.position} - Purchase</button>
        </div>
      </div>
    `;
  } else {
    snackString += `
      <div class='card col-4 text-center d-flex flex-column justify-content-between'>
        <h3>Empty</h3>
        <p >${position.position}</p>
      </div>
    `;
  }
  return snackString;
};

export default { makeSnack };
