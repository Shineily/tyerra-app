import { db } from '../firebase/firebase-config';

export const loadhouses = async (uid) => {
  const notesSnap = await db.collection(`${uid}/houses/data`).get();
  const notes = [];

  notesSnap.forEach((snapChild) => {
    notes.push({ id: snapChild.id, ...snapChild.data() });
  });

  return notes;
};

