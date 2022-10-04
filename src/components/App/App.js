import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { Gameboard, Sidebar, Menu } from 'components';
import { db } from 'utils';
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';

export const App = () => {
  const [display, setDisplay] = React.useState('start');
  const [gameTimer, setGameTimer] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [found, setFound] = React.useState([]);
  const [unfound, setUnfound] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState([]);
  const [leaderboard, setLeaderboard] = React.useState([]);

  const colRef = collection(db, 'items');
  const q = query(colRef, orderBy('item'));

  return (
    <div className={styles.container}>
      <Menu
        gameTimer={gameTimer}
        setGameTimer={setGameTimer}
        display={display}
        setDisplay={setDisplay}
        leaderboard={leaderboard}
        setLeaderboard={setLeaderboard}
      />
      <Sidebar
        items={items}
        setItems={setItems}
        found={found}
        setFound={setFound}
        unfound={unfound}
        setUnfound={setUnfound}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        gameTimer={gameTimer}
      />
      <Gameboard
        currentItem={currentItem}
        items={items}
        found={found}
        setFound={setFound}
        unfound={unfound}
        setUnfound={setUnfound}
        gameTimer={gameTimer}
        setGameTimer={setGameTimer}
        display={display}
        setDisplay={setDisplay}
      />
    </div>
  );
};

//
//
//
//
//
//
//
//
//

// Features to add:
// Start button that begins timer
//
//
//
//
//
//
// ARCHIVE
// place below into function to mass edit Firestore Database
// React.useEffect(() => {
//   hiddenObjects2.forEach((object) => {
//     console.log(object);
//     addDoc(colRef, object);
//     setItems((prevState) => [...prevState, object]);
//   });
//   addDoc(colRef, { item: 'clock', coordX: 1, coordY: 2, found: false });
//   console.log(items);
// }, []);
