import machineData from './machineData';
import positionData from './positionData';
import snackPositionData from './snackPositionData';
import snackData from './snackData';

const getCompleteMachine = () => new Promise((resolve, reject) => {
  //  get machine - returns machine1
  //  use machineId to get all positions for that machine
  //  use machineId to get all snackPositions
  //  use uid of snack positions/positions to get snacks
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineId(positions[0].machineId)
        .then((snackPositions) => {
          snackData.getSnacksByUid(positions[0].uid).then((snacks) => {
            const newPositions = [];
            positions.forEach((position) => {
              const newPos = { ...position };
              const getSnackPos = snackPositions.find((x) => x.positionId === newPos.id);
              if (getSnackPos) {
                const snack = snacks.find((y) => y.id === getSnackPos.snackId);
                newPos.snack = snack;
              } else {
                newPos.snack = {};
              }
              newPositions.push(newPos);
            });
            resolve(newPositions);
          });
        });
    }).catch((err) => reject(err));
  //  smash - return an array of positions (in order A1, A2, A3, B1...)
  //  so positions should have position.snack if a snack exists that that position
});

export default { getCompleteMachine };
