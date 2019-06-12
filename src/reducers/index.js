import {combineReducers} from 'redux';
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import {ADD_FAVORITE, DELETE_FAVORITE, UPDATE_SEARCH} from '../actions'

const initialSearchState = {
  searchTerm: '',
  searchResults: dummyData,
}

// Reducers
function search(state = initialSearchState, action) {
  switch (action.type) {
    case UPDATE_SEARCH:
      return {...state, searchTerm: action.payload.text, searchResults: action.payload.results};
    default:
      return state;
  }
}

function favorites(state = [], action) {
  switch(action.type) {
    case ADD_FAVORITE:
      return [...state, {name: action.payload.name, image_src: action.payload.image_src} ]
    case DELETE_FAVORITE:
      return (state.filter((tree) => tree.name !== action.payload));
    default:
      return state;
  }
}

// combines the reducers
export default combineReducers({
  search,
  favorites,
});
