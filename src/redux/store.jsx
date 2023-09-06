import { createStore } from "redux";

const initialState = {
  beerData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BEER_DATA":
      return {
        ...state,
        beerData: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
