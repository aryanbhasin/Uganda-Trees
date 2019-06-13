import {combineReducers} from 'redux';
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import {ADD_FAVORITE, DELETE_FAVORITE, UPDATE_SEARCH, SET_PIC_URI, GET_LOCATION, GET_LOCATION_ERROR, RESET_LOCATION} from '../actions'

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

var initFavStatus = [];
// initializes initialFavStatus by pushing each tree with isFavorited set to false
dummyData.forEach(tree => initFavStatus.push({name: tree.name, isFavorited: false, image_src: tree.image_src}))

const initialState = {
  favStatus: initFavStatus,
  numFavorites: 0,
};

function favorites(state = initialState, action) {
  var newFavStatus;
  switch(action.type) {
    case ADD_FAVORITE:
      newFavStatus = state.favStatus.map((tree) => {
        var returnVal = {...tree};
        if (tree.name === action.payload) {
          returnVal.isFavorited = true;
        }
        return returnVal
      });
      return {...state, numFavorites: state.numFavorites + 1, favStatus: newFavStatus};
    case DELETE_FAVORITE:
      newFavStatus = state.favStatus.map((tree) => {
        var returnVal = {...tree};
        if (tree.name === action.payload) {
          returnVal.isFavorited = false;
        }
        return returnVal
      });
      return {...state, numFavorites: state.numFavorites - 1, favStatus: newFavStatus};;
    default:
      return state;
  }
}

function location(state= {latitude: 40.350043, longitude: -74.659131}, action) {
  switch(action.type) {
    case GET_LOCATION:
      console.log(action.payload)
      return {latitude: action.payload.latitude, longitude: action.payload.longitude};
    // case GET_LOCATION_ERROR:
    //   console.log(action.payload)
    //   return state;
    case RESET_LOCATION: 
      return {latitude: '', longitude: ''}
    default:
      return state
  }
}

function camera(state = '', action) {
  switch(action.type) {
    case SET_PIC_URI:
      const image_uri = action.payload;
      return image_uri;
    default:
      return state;
  }
}

// combines the reducers
export default combineReducers({
  search,
  favorites,
  location,
  camera,
});
