import React from 'react';
import styles from './styles.module.css';
import gameImage from '../../shared/hiddenObjects.jpg';

export const Gameboard = ({
  currentItem,
  items,
  found,
  unfound,
  setFound,
  setUnfound,
  gameTimer,
  setGameTimer,
  display,
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

  const handleDrop = (e) => {
    checkDropped(currentItem, getCoordinate(e));
  };

  const checkDropped = (currentItem, coordinate) => {
    let xTolerance = 5;
    let yTolerance = 5;
    let draggedItemID = currentItem[1];
    let droppedCoordinate = coordinate;
    // Compare to database
    for (let _item of items) {
      if (_item[draggedItemID]) {
        let { coordX, coordY, item, found } = _item[draggedItemID];

        // Compare X coordinates
        let xDiff = Math.abs(coordX - droppedCoordinate[0]);

        // Compare Y coordinates
        let yDiff = Math.abs(coordY - droppedCoordinate[1]);

        // console.log('xy Diff', xDiff, yDiff);

        // If X < some threshold && Y < some threshold
        // then set item as Found
        if (xDiff < xTolerance && yDiff < yTolerance) {
          // set Found
          updateFound(draggedItemID, {
            coordY: coordY,
            coordX: coordX,
            found: true,
            item: item,
          });

          // set Unfound
          updateUnfound(draggedItemID);
          checkWin();
        } else {
          console.log('not found');
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
    console.log('unfoundCount', unfoundCount);
    if (unfoundCount <= 1) {
      setGameTimer((prevState) => [...prevState, currentTime]);
      setDisplay('win');
    }
  };

  React.useEffect(() => {
    let sinceLastClick = gameTimer[gameTimer.length - 1] - gameTimer[0];
  }, [gameTimer]);

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
//
//
//
//
// Archive

// console.log(coordX, coordY, item, found);

// console.log(
//   `Checking ${draggedItem} (${draggedItemID}) at location ${droppedCoordinate}`
// );

// tolerance:
// Y Vertical: 28 to 39
// X Horizontal: 71.37 to 77.56
// 5% in any direction from the center point

// Center: 74.43, 33.58
// Left: 71.37, 33.58
// Right: 77.56, 33.36
// Top: 74.5, 28.11
// Bottom: 74.62, 39.38

// tolerance:
// Vertical: 28 to 39
// Horiztonal: 71.37 to 77.56
// 5% in any direction from the center point

//
//
// navigator.clipboard.writeText(
//   `: { item: 'clock', coordX: ${coordX}, coordY: ${coordY}, found: false },`
// );
