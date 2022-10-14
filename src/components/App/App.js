import React from 'react';
import styles from './styles.module.css';
import { Gameboard, Sidebar, Menu } from 'components';
import { db } from 'utils';
import { collection, query, orderBy } from 'firebase/firestore';

export const App = () => {
  const [display, setDisplay] = React.useState('start');
  const [gameTimer, setGameTimer] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [found, setFound] = React.useState([]);
  const [unfound, setUnfound] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState([]);
  const [leaderboard, setLeaderboard] = React.useState([]);

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
        setCurrentItem={setCurrentItem}
        display={display}
      />
      <Gameboard
        currentItem={currentItem}
        items={items}
        setFound={setFound}
        unfound={unfound}
        setUnfound={setUnfound}
        setGameTimer={setGameTimer}
        setDisplay={setDisplay}
      />
    </div>
  );
};
