import Swal from 'sweetalert2';
import { db, firebase } from '../firebase/firebase-config';

import { types } from '../types/types';
import { houseLogout } from './houses';
import { finishLoading, startLoading, uiLogout } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
      dispatch(startLoading());
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
          dispatch(login(user.uid, user.displayName));

          dispatch(finishLoading());
        })
        .catch((e) => {
          dispatch(finishLoading());
          Swal.fire('Error', e.message, 'error');
        });
      
    };
  };

  export const startRegisterWithEmailPasswordNameBuy = (email, password, name, isSeller) => {
    return (dispatch) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async ({ user }) => {
          await user.updateProfile({ displayName: name });
          dispatch(login(user.uid, user.displayName, isSeller));
          const userType = {isSeller}
          await db.collection(`${user.uid}/auth/userype`).add(userType);
        })
        .catch((e) => Swal.fire('Error', e.message, 'error'));
    };

  };

  export const startRegisterWithEmailPasswordNameSeller = (email, password, name, isSeller) => {
    return (dispatch) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async ({ user }) => {
          await user.updateProfile({ displayName: name });
          dispatch(login(user.uid, user.displayName, isSeller));
          const userType = {isSeller}
          await db.collection(`${user.uid}/auth/userype`).add(userType);
        })
        .catch((e) => Swal.fire('Error', e.message, 'error'));
    };
  };

  export const login = (uid, displayName, isSeller) => ({
    type: types.login,
    payload: {
      uid,
      displayName,
      isSeller
    },
  });
  
  export const startLogout = () => {
    return async (dispatch) => {
      await firebase.auth().signOut();
      dispatch(logout());
      dispatch(houseLogout());
      dispatch(uiLogout());
    };
  };
  
  export const logout = () => ({
    type: types.logout,
  });