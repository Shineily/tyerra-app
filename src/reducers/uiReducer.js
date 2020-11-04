import { types } from '../types/types';

const initialState = {
  loading: false,
  // user: []
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };
    // case types.uiStartInfoUser:
    //   return {
    //     ...state,
    //     user: [action.payload, ...state.user]
    //   }
    // case types.uiStartLogout:
    //   return {
    //     loading: false,
    //     user: []
    //   }
    default:
      return state;
  }
};