import { loadUserInfo } from '../helpers/loadUserInfo';
import { types } from '../types/types';

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});

export const getUserInfo = (uid) => {
  return async (dispatch) => {
    const typeUserInfo = await loadUserInfo(uid);
    dispatch(userInfo(typeUserInfo))
  }
};

export const userInfo = (typeUserInfo) => ({
  type: types.uiStartInfoUser,
  payload: {
    typeUserInfo
  }
});

export const uiLogout = () => ({
  type: types.uiStartLogout
})