import React from 'react';
import styles from './styles.module.css';
import { hiddenObjects } from '../../shared/hiddenObjectsData';

import { db } from 'utils';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const Sidebar = ({
  items,
  setItems,
  found,
  setFound,
  unfound,
  setUnfound,
  currentItem,
  setCurrentItem,
  gameTimer,
}) => {
  const itemCollectionRef = collection(db, 'items');

  // Get the data from Firestore
  React.useEffect(() => {
    const getItems = async () => {
      const q = query(itemCollectionRef, orderBy('item'));
      const data = await getDocs(q);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, []);

  React.useEffect(() => {
    const getItems2 = async () => {
      const q = query(itemCollectionRef, orderBy('item'));
      const data = await getDocs(q);

      setItems(data.docs.map((doc) => ({ [doc.id]: doc.data() })));
    };

    getItems2();
  }, []);

  React.useEffect(() => {
    for (let index in items) {
      let itemId = Object.keys(items[index]).toString();
      let itemObject = items[index][itemId];

      itemObject.found
        ? setFound((prevState) => ({ ...prevState, [itemId]: itemObject }))
        : setUnfound((prevState) => ({ ...prevState, [itemId]: itemObject }));
    }
  }, [items]);

  const handleDragStart = (e) => setCurrentItem([e.target.name, e.target.id]);

  const show = (unfound, draggable) => {
    const unfoundList = [];
    for (let id in unfound) {
      let { item } = unfound[id];
      unfoundList.push(
        <button
          key={id}
          id={id}
          draggable={draggable}
          onDragStart={handleDragStart}
          name={item}
        >
          {item}
        </button>
      );
    }

    return unfoundList;
  };

  return (
    <div className={styles.container}>
      <div className={styles.unfound}>
        <h3>Unfound: </h3>
        {gameTimer[0] && (
          <div className={styles.objectsList}>{show(unfound, true)}</div>
        )}
      </div>

      <div className={styles.found}>
        {gameTimer[0] && <h3>Found: </h3>}
        {gameTimer[0] && (
          <div className={styles.foundList}>{show(found, false)}</div>
        )}
      </div>
    </div>
  );
};
