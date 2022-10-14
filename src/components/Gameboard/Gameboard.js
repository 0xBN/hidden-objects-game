import React from 'react';
import styles from './styles.module.css';
import gameImage from '../../shared/hiddenObjects.jpg';

export const Gameboard = ({
  currentItem,
  items,
  unfound,
  setFound,
  setUnfound,
  setGameTimer,
  setDisplay,
}) => {
  const getCoordinate = (e) => {
    const { offsetLeft, offsetTop, height, width } = e.target;
    const coordX = Math.floor(((e.pageX - offsetLeft) / width) * 10000) / 100;
    const coordY = Math.floor(((e.pageY - offsetTop) / height) * 10000) / 100;

    return [coordX, coordY];
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = (e) => checkDropped(currentItem, getCoordinate(e));

  const checkDropped = (currentItem, coordinate) => {
    let xTolerance = 5;
    let yTolerance = 5;
    let draggedItemID = currentItem[1];
    let droppedCoordinate = coordinate;
    // Compare to database
    for (let _item of items) {
      if (_item[draggedItemID]) {
        let { coordX, coordY, item } = _item[draggedItemID];

        // Compare X Y coordinates
        let xDiff = Math.abs(coordX - droppedCoordinate[0]);
        let yDiff = Math.abs(coordY - droppedCoordinate[1]);

        // If X < some threshold && Y < some threshold
        // then set item as Found
        if (xDiff < xTolerance && yDiff < yTolerance) {
          updateFound(draggedItemID, {
            coordY: coordY,
            coordX: coordX,
            found: true,
            item: item,
          });

          updateUnfound(draggedItemID);
          checkWin();
        }
      }
    }
  };

  const updateFound = (id, obj) => {
    setFound((prevState) => ({ ...prevState, [id]: obj }));
  };

  const updateUnfound = (id) => {
    let state = { ...unfound };
    delete state[id];
    setUnfound(state);
  };

  const checkWin = () => {
    let unfoundCount = Object.keys(unfound).length;
    let currentTime = Math.floor(Date.now() / 1000);

    if (unfoundCount <= 1) {
      setGameTimer((prevState) => [...prevState, currentTime]);
      setDisplay('win');
    }
  };

  return (
    <div className={styles.gameBoard}>
      <img
        id='gameboard'
        src={gameImage}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        alt=''
      />
    </div>
  );
};
