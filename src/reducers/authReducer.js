import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        user: {
          typeUserInfo: [{isSeller: action.payload.isSeller}]
        }
        
      };
    case types.logout:
      return {};
    case types.uiStartInfoUser:
      return {
        ...state,
        user: action.payload
      }
    case types.uiStartLogout:
      return {
        ...state,
        user: []
      }
    default:
      return state;
  }
};
