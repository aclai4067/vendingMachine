const makeSnack = (position) => {
  const item = position.snack;
  let snackString = '';
  if (item.name) {
    snackString += `
      <div class='card col-4'>
        <h3 class='text-center'>${position.position} - ${item.name}</h3>
        <img class='card-img' src='${item.imgUrl}' />
      </div>
    `;
  } else {
    snackString += `
      <div class='card col-4'>
        <h3 class='text-center'>${position.position} - Empty</h3>
      </div>
    `;
  }
  return snackString;
};

export default { makeSnack };
