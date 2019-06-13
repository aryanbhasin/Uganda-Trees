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

var initialFavoriteState = [];
// initializes initialFavoriteState by pushing each tree with isFavorited set to false
dummyData.forEach(tree => initialFavoriteState.push({name: tree.name, isFavorited: false, image_src: tree.image_src}))

function favorites(state = initialFavoriteState, action) {
  var newState = state;
  switch(action.type) {
    case ADD_FAVORITE:
      newState = state.map((tree) => {
        var returnVal = {...tree};
        if (tree.name === action.payload) {
          returnVal.isFavorited = true;
        }
        return returnVal
      });
      return newState;
    case DELETE_FAVORITE:
      newState = state.map((tree) => {
        var returnVal = {...tree};
        if (tree.name === action.payload) {
          returnVal.isFavorited = false;
        }
        return returnVal
      });
      return newState;
    default:
      // initial state returned as default
      return newState;
  }
}

// combines the reducers
export default combineReducers({
  search,
  favorites,
});
