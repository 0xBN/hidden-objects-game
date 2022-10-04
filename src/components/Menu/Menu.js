import React from 'react';
import styles from './styles.module.css';
import { db } from 'utils';
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';

export const Menu = ({
  gameTimer,
  setGameTimer,
  display,
  setDisplay,
  leaderboard,
  setLeaderboard,
}) => {
  const leaderboardCollectionRef = collection(db, 'leaderboard');

  React.useEffect(() => {
    const getLeaderboard = async () => {
      const q = query(leaderboardCollectionRef, orderBy('time'));
      const data = await getDocs(q);
      setLeaderboard(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(leaderboard);
    };
    getLeaderboard();
  }, [display]);

  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    return (
      ('0' + h).slice(-2) +
      ':' +
      ('0' + m).slice(-2) +
      ':' +
      ('0' + s).slice(-2)
    );
  };
  const time = (gameTimer) => gameTimer[1] - gameTimer[0];

  const handleSubmitScore = (e) => {
    const player_div = document.getElementById('playername');
    setDisplay('leaderboard');

    // write name and time (in seconds to Firestore)
    console.log(player_div.value);
    console.log(time(gameTimer));
    addDoc(leaderboardCollectionRef, {
      name: player_div.value,
      time: time(gameTimer),
    }).then(() => {
      player_div.value = '';
    });
  };

  const show = (leaderboard) => {
    let leaderboardDisplay = [];
    leaderboard.forEach((player) => {
      console.log(player.name);
      leaderboardDisplay.push(
        <div className={styles.leaderboardRow} key={nanoid()}>
          <div>Player: {player.name}</div>
          <div>Time: {player.time}</div>
        </div>
      );
    });
    return leaderboardDisplay;
  };
  return (
    <div className={styles.container}>
      {!gameTimer[0] && (
        <button
          className={styles.startButton}
          onClick={() => {
            let currentTime = Math.floor(Date.now() / 1000);
            setGameTimer((prevState) => [...prevState, currentTime]);
          }}
        >
          <div className={styles.title}>Start Game</div>
          <div>Drag & Drop items from the Sidebar</div>
        </button>
      )}

      {display === 'win' && (
        <div className={styles.winContainer}>
          <div className={styles.title}>YOU WON!</div>
          <div>Time: {secondsToHms(time(gameTimer))}</div>
          <div className={styles.inputName}>
            <input type='text' placeholder='name' id='playername' />
            <button
              className={styles.submitName}
              type='submit'
              onClick={handleSubmitScore}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {display === 'leaderboard' && (
        <div className={styles.winContainer}>
          <div className={styles.title}>Leaderboard</div>
          <div>{show(leaderboard)}</div>
          <button
            onClick={() => window.location.reload()}
            className={styles.submitName}
          >
            Play Again!
          </button>
        </div>
      )}
    </div>
  );
};
