import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { loadAllHouses } from '../helpers/loadAllHouses';
import { loadhouses } from '../helpers/loadhouses';
import { loadphoto } from '../helpers/loadphoto';
import { types } from '../types/types';

export const startNewHouse = (formValues) => {
    return async (dispatch, getState) => {
      const { uid } = getState().auth;
  
      const newHouse = {
        colonia: formValues[0],
        description: formValues[1],
      };

      const conUid  = {
        ...newHouse,
        uid: uid
      }
  
      const doc = await db.collection(`${uid}/houses/data`).add(newHouse);
      await db.collection(`houses`).doc(`${doc.id}`).set(conUid);

      dispatch(addNewHouse(doc.id, conUid));
      dispatch(activeHouse(doc.id, conUid));
      dispatch(refreshAllHouse(doc.id, conUid));
    };
};

export const saveHouse = (house) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    await db.collection(`${uid}/houses/data`).doc(house.id).set(house);

    dispatch(addNewHouse(house.id, house));
    dispatch(activeHouse(house.id, house));
  };
}

export const activeHouse = (id, house) => ({
    type: types.houseActive,
    payload: {
      id,
      ...house,
    },
  });

export const addNewHouse = (id, house) => ({
    type: types.housesAddNew,
    payload: {
      id,
      ...house
    }
});

export const startLoadingHouses = (uid) => {
    return async (dispatch) => {
      const houses = await loadhouses(uid);
      const allHouses = await loadAllHouses();
      dispatch(setAllHouses(allHouses));
      dispatch(setHouses(houses));
    };
};

export const setAllHouses = (allHouses) => ({
  type: types.housesAllLoad,
  payload: allHouses
});
  
export const setHouses = (houses) => ({
    type: types.housesLoad,
    payload: houses,
});

export const startSaveHouse = (house) => {
    return async (dispatch, getState) => {

      const { uid } = getState().auth;

      if(!house.url) {
        delete house.url;
      }
      
      const houseToFirestore = {...house};
      delete houseToFirestore.id;
  
      await db.doc(`${uid}/houses/data/${house.id}`).update(houseToFirestore);
      await db.doc(`houses/${house.id}`).update(houseToFirestore);
      dispatch(refreshHouse(house.id, houseToFirestore));
      dispatch(refreshAllHouse(house.id, houseToFirestore));
      dispatch(activeHouse(house.id, houseToFirestore));
    }
};

export const refreshAllHouse = (id, house) => ({
  type: types.housesUpdatedAllHouses,
  payload: {
    id, 
    data: {
      id,
      ...house
    }
  }
});


export const refreshHouse = (id, house) => ({
    type: types.housesUpdated,
    payload: {
      id, 
      data: {
        id,
        ...house
      }
    }
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
      const { uid } = getState().auth;
      const {active:activeHouses} = getState().houses;
      Swal.fire({
        title: 'Uploading...', 
        text: 'Please wait...', 
        allowOutsideClick: false,

      });
      const fileUrl = await loadphoto(file);

      const newUrl = {
        ...activeHouses,
        url : fileUrl
      }

      await db.doc(`${uid}/houses/data/${activeHouses.id}`).update(newUrl);
      await db.doc(`houses/${activeHouses.id}`).update(newUrl);
      dispatch(refreshHouse(activeHouses.id, newUrl));
      dispatch(refreshAllHouse(activeHouses.id, newUrl));
      dispatch(activeHouse(activeHouses.id, newUrl));
      Swal.close();
    }
};

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
      const uid = getState().auth.uid;
      await db.doc(`${uid}/houses/data/${id}`).delete();
      await db.doc(`houses/${id}`).delete();
      dispatch(deleteHouse(id));
    }
};

export const deleteHouseBuy = (id) => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;
    await db.doc(`${uid}/houses/data/${id}`).delete();
    dispatch(deleteHouse(id));
  }
};

export const startInactive = () => ({
  type: types.housesInactive
});
  
export const deleteHouse = (id) => ({
    type: types.housesDelete,
    payload: id
});
  
export const houseLogout = () => ({
    type: types.housesLogoutCleaning,
});