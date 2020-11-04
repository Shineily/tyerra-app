import { types } from '../types/types';

const initialstate = {
  allHouses: [],
  houses: [],
  active: null,
};

export const housesReducer = (state = initialstate, action) => {
    switch (action.type) {
      case types.houseActive:
        return {
          ...state,
          active: {
            ...action.payload,
          },
        };
      case types.housesInactive:
        return {
          ...state,
          active: null
        };
      case types.housesAddNew:
        return {
          ...state,
          houses: [action.payload, ...state.houses]
        }
      case types.housesLoad:
        return {
          ...state,
          houses: [...action.payload],
        };
      case types.housesAllLoad:
        return {
          ...state,
          allHouses: [...action.payload, ...state.allHouses]
        }
      case types.housesUpdated:
        return {
          ...state,
          houses: state.houses.map(
            house => house.id === action.payload.id
              ? action.payload.data
              : house
          )
        }
      case types.housesDelete:
        return {
          ...state,
          active: null,
          houses: state.houses.filter(house => house.id !== action.payload)
        }
      case types.housesLogoutCleaning:
        return {
          ...state,
          active: null,
          houses: [],
          allHouses: [],
        }
      case types.housesUpdatedAllHouses:
        return{
          ...state,
          allHouses: state.allHouses.map(
            house => house.id === action.payload.id
              ? action.payload.data
              : house
          )
        }
      default:
        return state;
    }
  };
  